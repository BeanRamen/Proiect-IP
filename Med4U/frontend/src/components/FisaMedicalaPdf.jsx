import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { TextField, Button, TextareaAutosize } from "@mui/material";

const FisaMedicalaPdf = () => {
  const componentRef = useRef();
  const [judet, setJudet] = useState("");
  const [localitate, setLocalitate] = useState("");
  const [unitateSanitara, setUnitateSanitara] = useState("");
  const [nr, setNr] = useState("");
  const [cnp, setCnp] = useState(Array(13).fill(""));

  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [sex, setSex] = useState("");
  const [an, setAn] = useState("");
  const [luna, setLuna] = useState("");
  const [ziua, setZiua] = useState("");
  const [stareCivila, setStareCivila] = useState("");
  const [localitateDomiciliu, setLocalitateDomiciliu] = useState("");
  const [strada, setStrada] = useState("");
  const [nrDomiciliu, setNrDomiciliu] = useState("");
  const [domiciliuSchimbat, setDomiciliuSchimbat] = useState("");
  const [locDeMunca, setLocDeMunca] = useState("");
  const [antecedenteColaterale, setAntecedenteColaterale] = useState("");
  const [personale, setPersonale] = useState("");
  const [conditiiMunca, setConditiiMunca] = useState("");
  const [tableData, setTableData] = useState({
    date: ["", "", "", ""],
    locConsultatie: ["", "", "", ""],
    simptome: ["", "", "", ""],
    diagnostic: ["", "", "", ""],
    codul: ["", "", "", ""],
    prescriptii: ["", "", "", ""],
    concediu: ["", "", "", ""],
  });

  const handleTableChange = (index, field, value) => {
    const newData = { ...tableData };
    newData[field][index] = value;
    setTableData(newData);
  };

  const handleCnpChange = (index, value) => {
    const newCnp = [...cnp];
    newCnp[index] = value;
    setCnp(newCnp);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Fisa Medicala",
    onAfterPrint: () => alert("Print success"),
  });

  return (
    <div className="p-4 bg-gray-200">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <TextField
          label="Județ"
          placeholder="Județ"
          value={judet}
          onChange={(e) => setJudet(e.target.value)}
        />
        <TextField
          label="Localitate"
          placeholder="Localitate"
          value={localitate}
          onChange={(e) => setLocalitate(e.target.value)}
        />
        <TextField
          label="Unitatea sanitară"
          placeholder="Unitatea sanitară"
          value={unitateSanitara}
          onChange={(e) => setUnitateSanitara(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4  pr-8">
        <TextField
          label="NR"
          placeholder="NR"
          value={nr}
          onChange={(e) => setNr(e.target.value)}
        />
        <div>
          <label className="block text-sm font-bold mb-2">
            Cod numeric personal
          </label>
          <div className="flex space-x-2">
            {cnp.map((digit, index) => (
              <TextField
                key={index}
                inputProps={{ maxLength: 1 }}
                value={digit}
                onChange={(e) => handleCnpChange(index, e.target.value)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <TextField
          label="Numele"
          placeholder="Numele"
          value={nume}
          onChange={(e) => setNume(e.target.value)}
        />
        <TextField
          label="Prenumele"
          placeholder="Prenumele"
          value={prenume}
          onChange={(e) => setPrenume(e.target.value)}
        />
        <TextField
          label="Sexul"
          placeholder="Sexul"
          value={sex}
          onChange={(e) => setSex(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <TextField
          label="Anul nașterii"
          placeholder="Anul"
          value={an}
          onChange={(e) => setAn(e.target.value)}
        />
        <TextField
          label="Luna nașterii"
          placeholder="Luna"
          value={luna}
          onChange={(e) => setLuna(e.target.value)}
        />
        <TextField
          label="Ziua nașterii"
          placeholder="Ziua"
          value={ziua}
          onChange={(e) => setZiua(e.target.value)}
        />
        <TextField
          label="Starea civilă"
          placeholder="Starea civilă"
          value={stareCivila}
          onChange={(e) => setStareCivila(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <TextField
          label="Localitatea domiciliului"
          placeholder="Localitatea domiciliului"
          value={localitateDomiciliu}
          onChange={(e) => setLocalitateDomiciliu(e.target.value)}
        />
        <TextField
          label="Strada"
          placeholder="Strada"
          value={strada}
          onChange={(e) => setStrada(e.target.value)}
        />
        <TextField
          label="Nr."
          placeholder="Nr."
          value={nrDomiciliu}
          onChange={(e) => setNrDomiciliu(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <TextField
          label="Domiciliu schimbat"
          placeholder="Domiciliu schimbat"
          value={domiciliuSchimbat}
          onChange={(e) => setDomiciliuSchimbat(e.target.value)}
        />
        <TextField
          label="Loc de muncă"
          placeholder="Loc de muncă"
          value={locDeMunca}
          onChange={(e) => setLocDeMunca(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <TextField
          label="Antecedente colaterale"
          placeholder="Antecedente colaterale"
          value={antecedenteColaterale}
          onChange={(e) => setAntecedenteColaterale(e.target.value)}
        />
        <TextField
          label="Personale"
          placeholder="Personale"
          value={personale}
          onChange={(e) => setPersonale(e.target.value)}
        />
        <TextField
          label="Conditii de munca"
          placeholder="Conditii de munca"
          value={conditiiMunca}
          onChange={(e) => setConditiiMunca(e.target.value)}
        />
      </div>

      <div ref={componentRef} className="border p-4 border-black border-10">
        <div className="flex justify-between">
          <div>
            <p>
              <strong>Județ:</strong> {judet}
            </p>
            <p>
              <strong>Localitatea:</strong> {localitate}
            </p>
            <p>
              <strong>Unitatea sanitară:</strong> {unitateSanitara}
            </p>
          </div>
          <div>
            <p>
              <strong>NR:</strong> {nr}
            </p>
            <p>
              <strong>Cod numeric personal:</strong>{" "}
              {cnp.map((digit, index) => (
                <span key={index}>{digit}</span>
              ))}
            </p>
          </div>
        </div>
        <h1 className="text-center font-bold">FIȘA DE CONSULTAȚII MEDICALE</h1>
        <h2 className="text-center mb-4">- ADULȚI -</h2>

        <div className="grid grid-cols-3 gap-2 mb-2">
          <p className="col-span-1">
            <strong>Numele:</strong> {nume}
          </p>
          <p className="col-span-1">
            <strong>Prenumele:</strong> {prenume}
          </p>
          <p className="col-span-1">
            <strong>Sexul:</strong> {sex}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-2">
          <p className="col-span-1">
            <strong>Data nașterii: anul:</strong> {an}
          </p>
          <p className="col-span-1">
            <strong>luna:</strong> {luna}
          </p>
          <p className="col-span-1">
            <strong>ziua:</strong> {ziua}
          </p>
          <p className="col-span-1">
            <strong>Starea civilă:</strong> {stareCivila}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-2">
          <p className="col-span-1">
            <strong>Domiciliul: localitatea:</strong> {localitateDomiciliu}
          </p>
          <p className="col-span-1">
            <strong>strada:</strong> {strada}
          </p>
          <p className="col-span-1">
            <strong>nr.:</strong> {nrDomiciliu}
          </p>
        </div>

        <hr className="mb-4" />

        <h3 className="text-center mb-4">Schimbări de</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-center">
              <strong>domiciliu schimbat:</strong>
            </p>
            <p className="text-center">{domiciliuSchimbat}</p>
          </div>
          <div>
            <p className="text-center">
              <strong>loc de muncă:</strong>
            </p>
            <p className="text-center">{locDeMunca}</p>
          </div>
        </div>

        <div className="mb-2">
          <p className="mb-12">
            <strong>Antecedente heredo-colaterale:</strong>
            {antecedenteColaterale}
          </p>
          <p className="mb-6">
            <strong>Personale:</strong> {personale}
          </p>
          <p className="mb-4">
            <strong>Conditii de munca: </strong> {conditiiMunca}
          </p>
        </div>

        <table className="table-auto w-full mb-4 border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">
                Data: anul/luna/ziua
              </th>
              <th className="border border-gray-300 p-2">Locul Consultației</th>
              <th className="border border-gray-300 p-2">Simptome</th>
              <th className="border border-gray-300 p-2">Diagnostic</th>
              <th className="border border-gray-300 p-2">Codul</th>
              <th className="border border-gray-300 p-2">
                Prescripții/Recomandări
              </th>
              <th className="border border-gray-300 p-2">
                Nr. zile concediu medical; Nr. certificat
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 4 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-gray-300 p-2">
                  {tableData.date[rowIndex]}
                </td>
                <td className="border border-gray-300 p-2">
                  {tableData.locConsultatie[rowIndex]}
                </td>
                <td className="border border-gray-300 p-2">
                  {tableData.simptome[rowIndex]}
                </td>
                <td className="border border-gray-300 p-2">
                  {tableData.diagnostic[rowIndex]}
                </td>
                <td className="border border-gray-300 p-2">
                  {tableData.codul[rowIndex]}
                </td>
                <td className="border border-gray-300 p-2">
                  {tableData.prescriptii[rowIndex]}
                </td>
                <td className="border border-gray-300 p-2">
                  {tableData.concediu[rowIndex]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6">
          <div>
            <p>*C = cabinet; D = domiciliu.</p>
          </div>
          <div>
            <p>
              ** Se va trece semnatura si parafa medicului dupa fiecare
              consultatie.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 mt-12">
        {Array.from({ length: 4 }).map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <TextField
              label={`Data (Row ${rowIndex + 1})`}
              placeholder={`Data (Row ${rowIndex + 1})`}
              value={tableData.date[rowIndex]}
              onChange={(e) =>
                handleTableChange(rowIndex, "date", e.target.value)
              }
            />
            <TextField
              label={`Locul Consultației (Row ${rowIndex + 1})`}
              placeholder={`Locul Consultației (Row ${rowIndex + 1})`}
              value={tableData.locConsultatie[rowIndex]}
              onChange={(e) =>
                handleTableChange(rowIndex, "locConsultatie", e.target.value)
              }
            />
            <TextField
              label={`Simptome (Row ${rowIndex + 1})`}
              placeholder={`Simptome (Row ${rowIndex + 1})`}
              value={tableData.simptome[rowIndex]}
              onChange={(e) =>
                handleTableChange(rowIndex, "simptome", e.target.value)
              }
            />
            <TextField
              label={`Diagnostic (Row ${rowIndex + 1})`}
              placeholder={`Diagnostic (Row ${rowIndex + 1})`}
              value={tableData.diagnostic[rowIndex]}
              onChange={(e) =>
                handleTableChange(rowIndex, "diagnostic", e.target.value)
              }
            />
            <TextField
              label={`Codul (Row ${rowIndex + 1})`}
              placeholder={`Codul (Row ${rowIndex + 1})`}
              value={tableData.codul[rowIndex]}
              onChange={(e) =>
                handleTableChange(rowIndex, "codul", e.target.value)
              }
            />
            <TextField
              label={`Prescripții/Recomandări (Row ${rowIndex + 1})`}
              placeholder={`Prescripții/Recomandări (Row ${rowIndex + 1})`}
              value={tableData.prescriptii[rowIndex]}
              onChange={(e) =>
                handleTableChange(rowIndex, "prescriptii", e.target.value)
              }
            />
            <TextField
              label={`Concediu (Row ${rowIndex + 1})`}
              placeholder={`Concediu (Row ${rowIndex + 1})`}
              value={tableData.concediu[rowIndex]}
              onChange={(e) =>
                handleTableChange(rowIndex, "concediu", e.target.value)
              }
            />
          </React.Fragment>
        ))}
      </div>

      <Button
        onClick={handlePrint}
        variant="contained"
        color="primary"
        className="mt-8"
      >
        Print this
      </Button>
    </div>
  );
};

export default FisaMedicalaPdf;
