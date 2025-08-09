// import React, { useState } from "react";
// import { Scanner } from "@yudiel/react-qr-scanner";

// export default function ScannerCarteEtudiant() {
//     const [data, setData] = useState(null);

//     // const handleScan = (result) => {
//     //     try {
//     //         const parsed = JSON.parse(result);
//     //         setData(parsed);
//     //     } catch (e) {
//     //         console.error("QR invalide");
//     //     }
//     // };

//     return (
//         <div style={{ padding: "20px" }}>
//         <h3>Scanner la carte d'étudiant</h3>
//         <Scanner
//             // onDecode={(result) => handleScan(result)}
//             onDecode={(result) => {
//                 try {
//                 const data = JSON.parse(result);
//                 setData(data);
//                 } catch (e) {
//                 console.error("QR invalide :", e);
//                 }
//             }}
//             // onError={(error) => console.error("Erreur QR:", error)}
//             onError={(error) => {
//                 console.error("Erreur QR :", error);
//             }}
//         />

//         {data && (
//             <div style={{ marginTop: "20px" }}>
//                 <h4>Résultat</h4>
//                 <p><strong>Nom et Prénom :</strong> {data.nom} {data.prenom}</p>
//                 <p><strong>Matricule :</strong> {data.matricule}</p>
//                 <p><strong>Classe :</strong> {data.classe}</p>
//                 <p><strong>Valide jusqu’au :</strong> {new Date(data.validite).toLocaleDateString()}</p>
//                 <p style={{ color: new Date() <= new Date(data.validite) ? "green" : "red" }}>
//                     <strong>
//                     {new Date() <= new Date(data.validite) ? "Carte valide ✅" : "Carte expirée ❌"}
//                     </strong>
//                 </p>
//             </div>
//         )}
//         </div>
//     );
// }


// import React, { useState } from "react";
// import { Scanner } from "@yudiel/react-qr-scanner";

// export default function ScannerCarteEtudiant() {
//     const [result, setResult] = useState(null);

//     const onScanResult = (result) => {
//         try {
//             // Vérifie si c’est bien un tableau avec au moins un élément
//             if (!Array.isArray(result) || result.length === 0) return;

//             // Récupérer le contenu du QR
//             const rawData = result[0].rawValue;

//             // Affichage brut pour vérification
//             console.log("🔍 Donnée brute du QR :", rawData);

//             // Décoder la chaîne JSON
//             const data = JSON.parse(rawData);

//             console.log("✅ Donnée décodée :", data);

//             // Ici tu peux traiter les données, par exemple afficher leur validité :
//             const dateValidite = new Date(data.validite);
//             const isStillValid = new Date() <= dateValidite;

//             console.log(isStillValid ? "✅ Carte encore valide" : "⛔ Carte expirée");

//             // Tu peux aussi mettre à jour un état pour l’afficher à l’utilisateur
//             setResult(data); // par exemple
//         } catch (error) {
//             console.error("❌ QR invalide :", error.message);
//         }
//     };


//     return (
//         <div>
//         <h3>Scanner une carte d'étudiant</h3>
//         <Scanner onScan={onScanResult} />
//         {result && (
//             <div>
//             <h4>Infos de la carte :</h4>
//             <pre>{JSON.stringify(result, null, 2)}</pre>
//             </div>
//         )}
//         </div>
//     );
// }


import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';

export default function ScannerCarteEtudiant() {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const onScanResult = (results) => {
        try {
        if (!Array.isArray(results) || results.length === 0) {
            throw new Error("Aucune donnée scannée");
        }

        const rawData = results[0].rawValue;
        const data = JSON.parse(rawData);

        const dateValidite = new Date(data.validite);
        const isValid = new Date() <= dateValidite;

        setResult({ ...data, isValid });
        setError(null);
        } catch (err) {
        setResult(null);
        setError(err.message || "QR invalide");
        }
    };

    const resetScanner = () => {
        setResult(null);
        setError(null);
    };

    return (
        <div className="p-4">
        <h2>Scanner une carte d'étudiant</h2>

        {!result && (
            <div style={{ maxWidth: 500, marginTop: '20px' }}>
            <Scanner
                onScan={onScanResult}
                // constraints={{ facingMode: 'environment' }}
            />
            </div>
        )}

        {error && (
            <Message severity="error" text={`QR invalide : ${error}`} className="mt-3" />
        )}

        {result && (
            <Card title="Informations Carte Étudiant" className="mt-4">
            <p><strong>Nom :</strong> {result.nom} {result.prenom}</p>
            <p><strong>Matricule :</strong> {result.matricule}</p>
            <p><strong>Classe :</strong> {result.classe}</p>
            <p><strong>Valide jusqu'au :</strong> {new Date(result.validite).toLocaleDateString()}</p>
            <p>
                <strong>Statut :</strong>{" "}
                {result.isValid ? (
                <span className="text-green-600 font-bold">Valide ✅</span>
                ) : (
                <span className="text-red-600 font-bold">Expirée ⛔</span>
                )}
            </p>

            <Button
                label="Scanner un autre"
                icon="pi pi-refresh"
                className="mt-3 bg-yellow-400 rounded-button"
                onClick={resetScanner}
            />
            </Card>
        )}
        </div>
    );
}


