describe("Login component", () => {
  it("allows user to login with valid credentials", () => {
    // Definim un obiect care să conțină toate informațiile pentru completarea formularului de autentificare
    const loginData = {
      'CNP': '1234567890123',
      'Parola': 'parola123'
    };

    // Accesăm pagina de autentificare
    cy.visit("http://localhost:5173/login");

    // Așteptăm ca toate elementele să fie încărcate
    cy.wait(2000);

    // Iterăm prin fiecare câmp din obiect și completăm formularul cu datele corespunzătoare
    Object.entries(loginData).forEach(([field, value]) => {
      cy.get('body').then(($body) => {
        console.log(`Field: ${field}, Value: ${value}`);
        if ($body.find(`input[name="${field.toLowerCase()}"]`).length) {
          cy.get(`input[name="${field.toLowerCase()}"]`).type(value);
        } else {
          cy.log(`Input field for ${field} is not present`);
        }
      });
    });

    // Așteptăm ca utilizatorul să fie redirecționat către o altă pagină, după autentificare
    cy.contains("Autentificare").click();

    // Verificăm răspunsul de la server pentru URL-ul de redirecționare
    cy.intercept("POST", "/api/auth/login").as("loginRequest"); // Update the route path to match the actual login endpoint
    cy.wait("@loginRequest", { timeout: 10000 }).then((interception) => { // Increase the timeout duration
      const responseBody = interception.response.body;
      if (responseBody.redirectUrl) {
        cy.visit(responseBody.redirectUrl);
      } else {
        // Handle other scenarios if needed
      }
    });

  });
});
