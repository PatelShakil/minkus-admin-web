import useFetchAllProtocolState from "../components/states/FetchAllProtocolState";
import Loading from "../components/Loading.jsx";
import { useState, useEffect, useMemo } from "react";
import getJa from "../utils/getJa.jsx";
import html2pdf from "html2pdf.js";

const AllProtocol = () => {
  const { isLoading, d, error } = useFetchAllProtocolState();
  const [data, setData] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const list = [
    "form_a",
    "form_b",
    "form_c",
    "form_d",
    "form_e",
    "form_f",
    "form_g",
  ];

  // Effect to transform fetched data into a usable format
  useEffect(() => {
    if (d.length > 0) {
      const transformedData = d.map((protocol) => {
        // Use find to get the first non-null form
        const form = list
          .map((formKey) => protocol.forms[formKey])
          .find(Boolean);
        return { ...protocol, form };
      });
      setData(transformedData);
    }
  }, [d]);

  // Log data whenever it changes
  useEffect(() => {
    console.log(data);
  }, [data]);

  // Function to download the specific form as a PDF
  const downloadAsPDF = async (elementId) => {
    const element = document.getElementById(elementId);

    // Check if the element exists
    if (!element) {
      console.error("Element not found:", elementId);
      return;
    }

    // Create a promise to check if images are loaded
    const images = element.getElementsByTagName("img");
    const imagePromises = Array.from(images).map((img) => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve(); // Image already loaded
        } else {
          img.onload = resolve; // Resolve when loaded
          img.onerror = (err) => {
            console.error("Image load error:", err);
            resolve(); // Resolve even on error
          };
        }
      });
    });

    // Wait for all images to load
    await Promise.all(imagePromises);

    // Ensure images are visible (not hidden)
    Array.from(images).forEach((img) => {
        console.log(img);
        img.style.background = `url(${img.src})`;
      img.style.display = "block"; // Make sure the image is displayed
      img.style.visibility = "visible"; // Ensure the image is visible
    });

    const opt = {
      margin: 0.2,
      filename: `${elementId}.pdf`,
      image: { type: "jpeg", quality: 1 }, // Improve quality of images
      html2canvas: { scale: 2, useCORS: true }, // Increase scale for better quality
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generate the PDF
    try {
      await html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };    

  return (
    <div className={"flex flex-col"}>
      {isLoading && <Loading />}

      {error && (
        <div className={"flex mt-20"}>
          <p className={"text-red-400"}>{error}</p>
        </div>
      )}

      <div
        className={
          "fixed top-0 w-full text-center p-3 bg-gray-300 z-10 shadow-2xl"
        }>
        <p>All Protocols</p>
      </div>

      <div className={"flex mt-14 flex-col mx-2"}>
        {data.map((protocol, index) => (
          <div
            id={protocol.protocol_subs.id}
            key={protocol.protocol_subs.id || index} // Use unique key if available
            className={
              "flex flex-col shadow-sm p-4 m-2 rounded-md bg-gray-100"
            }>
            <span
              className={
                "text-sm grid grid-cols-1 lg:grid-cols-2 w-full mx-2 justify-center"
              }>
              <div className="col-span-1">
                <p className={"font-bold text-lg"}>
                  Protocol ID: {protocol.protocol_subs.id}
                </p>
                <p>
                  User Email: <b>{protocol.protocol_subs.user_email}</b>
                </p>
                {/* Now displaying the selected form details */}
                {protocol.form && (
                  <div>
                    <p>
                      Name: <b>{protocol.form.name}</b>
                    </p>
                    <p>
                      Rundgang Datum: <b>{protocol.form.rundgang}</b>
                    </p>
                    <p>
                      Objekt / Straße: <b>{protocol.form.state}</b>
                    </p>
                    <p>
                      Location:{" "}
                      <a
                        className={"text-blue-500"}
                        href={`https://www.google.com/maps?q=${protocol.form.lat},${protocol.form.lon}`}>
                        <b>Click to View</b>
                      </a>
                    </p>
                  </div>
                )}
                <p>
                  Created At: <b>{protocol.protocol_subs.created_at}</b>
                </p>
              </div>
              <div className="col-span-1">
                <button
                  className={
                    "bg-green-500 p-2 text-center text-white w-full rounded-tl-md rounded-tr-md"
                  }
                  onClick={() => downloadAsPDF(protocol.protocol_subs.id)}>
                  Download Protocol
                </button>
                <div className={"shadow-sm rounded-md bg-white text-center"}>
                  {protocol.form && (
                    <img
                      src={protocol.form.signature}
                      alt={protocol.form.signature}
                      className={"w-52"}
                    />
                  )}
                  <b>Signature</b>
                </div>
              </div>
            </span>

            {/* Display Forms */}
            <div
              className={"grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-2"}>
              {list.map((formKey, i) => {
                const form = protocol.forms[formKey];
                if (!form) return null;
                // Use a switch statement for better organization
                switch (formKey) {
                  case "form_a":
                    return (
                      <div
                        key={formKey}
                        className={
                          "col-span-1 flex flex-col shadow-sm p-2 m-2 rounded-md bg-white"
                        }>
                        <p className="text-center font-bold">Eingangsbereich</p>
                        <p>
                          Sauberkit: <b>{form.sauberkit}</b>
                        </p>
                        <p>
                          Eingangstüre und Türschließer auf Funktion prüfen:{" "}
                          <b>{getJa(form.checkbox1)}</b>
                        </p>
                        <p>
                          Briefkastenanlage
                          Sauberkeit/Aufkleber/Namensschschlder:{" "}
                          <b>{getJa(form.checkbox2)}</b>
                        </p>
                      </div>
                    );
                  case "form_b":
                    return (
                      <div
                        key={formKey}
                        className={
                          "col-span-1 flex flex-col shadow-sm p-2 m-2 rounded-md bg-white"
                        }>
                        <p className="text-center font-bold">Treppenhaus</p>
                        <p>
                          Sauberkit: <b>{form.sauberkit}</b>
                        </p>
                        <p>
                          Beleuchtung auf Funktion prüfen:{" "}
                          <b>{getJa(form.checkbox1)}</b>
                        </p>
                        <p>
                          Sind Flucht- und Rettungswege frei?:{" "}
                          <b>{getJa(form.checkbox2)}</b>
                        </p>
                        <p>
                          Alle Fenster 1x öffnen und 1x schließen - schließen
                          diese sauber?: <b>{getJa(form.checkbox3)}</b>
                        </p>
                        <p>
                          Aufzug Sauberkeit der Gleitschiene Nacharbeit nötig?:{" "}
                          <b>{getJa(form.checkbox4)}</b>
                        </p>
                      </div>
                    );
                  case "form_c":
                    return (
                      <div
                        key={formKey}
                        className={
                          "col-span-1 flex flex-col shadow-sm p-2 m-2 rounded-md bg-white"
                        }>
                        <p className="text-center font-bold">Keller</p>
                        <p>
                          Sauberkit: <b>{form.sauberkit}</b>
                        </p>
                        <p>
                          Rohrleitung auf Dichtigkeit OPTISCH prüfen (bei
                          Schäden Fotos): <b>{getJa(form.checkbox1)}</b>
                        </p>
                        <p>
                          Alle Brandschutztüren prüfen (selbstständige
                          Schließung): <b>{getJa(form.checkbox2)}</b>
                        </p>
                        <p>
                          Rückspülfilter/Wasserfilter (Reinigung alle 14 Tage
                          bestätigen): <b>{getJa(form.checkbox3)}</b>
                        </p>
                      </div>
                    );
                  case "form_d":
                    return (
                      <div
                        key={formKey}
                        className={
                          "col-span-1 flex flex-col shadow-sm p-2 m-2 rounded-md bg-white"
                        }>
                        <p className="text-center font-bold">
                          Hinterhof (wenn vorhanden)
                        </p>
                        <p>
                          Sauberkit: <b>{form.sauberkit}</b>
                        </p>
                        <p>
                          Unratbeseitigung (falls im Vertrag):{" "}
                          <b>{getJa(form.checkbox1)}</b>
                        </p>
                      </div>
                    );
                  case "form_e":
                    return (
                      <div
                        key={formKey}
                        className={
                          "col-span-1 flex flex-col shadow-sm p-2 m-2 rounded-md bg-white"
                        }>
                        <p className="text-center font-bold">Außenanlage</p>
                        <p>
                          Sauberkit: <b>{form.sauberkit}</b>
                        </p>
                        <p>
                          Unratbeseitigung (falls im Vertrag):{" "}
                          <b>{getJa(form.checkbox1)}</b>
                        </p>
                        <p>
                          Papierkörbe wenn vorhanden leeren:{" "}
                          <b>{getJa(form.checkbox2)}</b>
                        </p>
                        <p>
                          Müllplatz reinigen (auf Bedarf - Besen zu verwenden):{" "}
                          <b>{getJa(form.checkbox3)}</b>
                        </p>
                      </div>
                    );
                  case "form_f":
                    return (
                      <div
                        key={formKey}
                        className={
                          "col-span-1 flex flex-col shadow-sm p-2 m-2 rounded-md bg-white"
                        }>
                        <p className="text-center font-bold">Spielplatz</p>
                        <p>
                          Unratbeseitigung : <b>{getJa(form.checkbox1)}</b>
                        </p>
                        <p>
                          Optische Zustandskontrolle (Beschädigungen melden) :{" "}
                          <b>{getJa(form.checkbox2)}</b>
                        </p>
                      </div>
                    );
                  case "form_g":
                    return (
                      <div
                        key={formKey}
                        className={
                          "col-span-1 flex flex-col shadow-sm p-2 m-2 rounded-md bg-white"
                        }>
                        <p className="text-center font-bold">Müll</p>
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProtocol;
