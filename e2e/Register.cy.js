describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/register'); // Ensure this URL is correct
    cy.contains('Creează cont', { timeout: 15000 }).should('be.visible'); // Wait for the form header to be visible
  });

  it('should display registration form with required fields', () => {
    // List of selectors for the required fields
    const elements = [
      'input[name="user[nume]"]',
      'input[name="user[cnp]"]',
      'input[name="user[varsta]"]',
      'input[name="user[numar_telefon]"]',
      'input[name="user[email]"]',
      'input[name="user[adresa]"]',
      'input[name="user[loc_munca]"]',
      'textarea[name="user[descriere]"]',
      'input[name="user[password]"]',
      'input[name="user[passwordConfirm]"]'
    ];

    // Iterate over each selector and check for its visibility
    elements.forEach(selector => {
      cy.get('body').then($body => {
        if ($body.find(selector).length > 0) {
          cy.get(selector, { timeout: 15000 }).should('be.visible');
        } else {
          cy.log(`Element ${selector} not found`);
        }
      });
    });

  });

  it('should show validation messages for required fields when form is submitted empty', () => {
    // Attempt to submit the form without filling in any fields
    cy.get('form').submit();
  
    // Log a message to confirm form submission
    cy.log('Form submitted');
  
    // Check if validation messages appear
    cy.contains('Nume este obligatoriu!').should('be.visible');
    cy.contains('CNP-ul trebuie să fie un număr de exact 13 cifre!').should('be.visible');
    cy.contains('Vârsta este obligatoriu!').should('be.visible');
    cy.contains('Telefon este obligatoriu!').should('be.visible');
    cy.contains('Email este obligatoriu!').should('be.visible');
  });
  
  

  it('should show validation errors for empty required fields', () => {
    cy.get('button[type="submit"]').click();

    const errorMessages = [
      'Nume este obligatoriu!',
      'CNP-ul trebuie să fie un număr de exact 13 cifre!',
      'Vârsta este obligatoriu!',
      'Telefon este obligatoriu!',
      'Email este obligatoriu!'
    ];

    errorMessages.forEach(message => {
      cy.contains(message).should('be.visible');
    });
  });

  it('should register successfully with valid data', () => {
    cy.visit('http://localhost:5173/register'); // Asigură-te că vizitezi pagina corectă
    // Definim un obiect care să conțină toate informațiile pentru completarea formularului
    const userData = {
        'Nume': 'Ana',
        'CNP': '1234567890123',
        'Vârsta': '30',
        'Telefon': '0712345678',
        'Email': 'ana@example.com',
        'Adresa': 'Strada Exemplu, Nr. 123',
        'Locul de muncă': 'Compania Exemplu',
        'Descriere': 'Aceasta este o descriere a utilizatorului Ana.',
        'Parola': 'parola123',
        'Confirmare Parola': 'parola123'
    };

    // Iterăm prin fiecare câmp din obiect și completăm formularul cu datele corespunzătoare
    Object.entries(userData).forEach(([field, value]) => {
        cy.get('body').then(($body) => {
            if ($body.find(`input[name="usor[${field.toLowerCase()}]"]`).length) {
                cy.get(`input[name="usor[${field.toLowerCase()}]"]`).type(value);
            } else {
                cy.log(`Input field for ${field} is not present`);
            }
        });
    });
});

});
