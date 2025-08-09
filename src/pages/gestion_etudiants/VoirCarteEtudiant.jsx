// import React, { useState,useRef } from "react";
// import { Button } from 'primereact/button';
// import { Dialog } from 'primereact/dialog';
// import QRCode from "react-qr-code";
// import { useReactToPrint } from 'react-to-print';
// import Logo from "../../assets/biu-logo.jpg";


// export default function VoirCarteEtudiant({ visible, setVisible, event }) {
//     const componentRef = useRef();
//     const handlePrint = useReactToPrint({
//         content: () => componentRef.current,
//         documentTitle: "Carte_Etudiant",
        
//     });

//     return (
//         <div className="card flex justify-content-center">
//             <Dialog 
//                 visible={visible} 
//                 modal 
//                 onHide={() => { if (!visible) return; setVisible(false); }} 
//                 style={{border:"8px solid #80f3a2",height:"600px",overflow:"hidden"}}
//                 header="Carte d'étudiant"
//                 footer={
//                     <div className="flex justify-content-center">
//                         <Button 
//                             onClick={handlePrint}
//                             icon="pi pi-print"
//                             rounded
//                             label="Imprimer"
//                             className="p-button-success"
//                         />
//                     </div>
//                 }
//             >
//                 <div ref={componentRef} style={{padding:"10px",width:"300px",}}>
//                     <center>
//                         <h5><b>{`${event?.candidature?.NOM} ${event?.candidature?.PRENOM}`}</b>  </h5>
//                         <h6><b>{event?.NUMERO_MATRICULE}</b></h6>
//                         <h6><b>{event?.candidature?.classe?.DESCRIPTION}</b></h6>
//                         <br/>
//                     </center>
//                     <center>
//                         <b/>
//                         <QRCode
//                             size={256}
//                             // style={{ height: "auto", maxWidth: "100%", width: "100%" }}
//                             style={{ width: "200px", height: "200px" }}
//                             value={`${event?.NUMERO_MATRICULE}`}
//                             viewBox={`0 0 256 256`}
//                         />

//                         {/* <img src="" style={{ width: "200px", height: "200px", border: "1px solide " }} /> */}
//                     </center>
//                 </div>
//             </Dialog>
//         </div>
//     )
// }


// import React, { useRef } from "react";
// import { Button } from 'primereact/button';
// import { Dialog } from 'primereact/dialog';
// import QRCode from "react-qr-code";
// import { useReactToPrint } from 'react-to-print';
// import Logo from "../../assets/biu-logo.jpg";

// export default function VoirCarteEtudiant({ visible, setVisible, event }) {
//     const componentRef = useRef();

//     const handlePrint = useReactToPrint({
//         content: () => componentRef.current,
//         documentTitle: "Carte_Etudiant",
//     });

//     const renderLine = () => (
//         <div style={{
//             height: "1px",
//             backgroundColor: "#ccc",
//             margin: "8px 0"
//         }} />
//     );

//     return (
//         <div className="card flex justify-content-center">
//             <Dialog
//                 visible={visible}
//                 modal
//                 onHide={() => { if (!visible) return; setVisible(false); }}
//                 style={{ border: "8px solid #d4af37", height: "auto", width: "375px", overflow: "hidden" }}
//                 header="Carte d'étudiant"
//                 footer={
//                     <div className="flex justify-content-center">
//                         <Button
//                             onClick={handlePrint}
//                             icon="pi pi-print"
//                             label="Imprimer"
//                             className="p-button-warning"
//                         />
//                     </div>
//                 }
//             >
//                 <div
//                     ref={componentRef}
//                     style={{
//                         width: "300px",
//                         padding: "20px",
//                         border: "3px solid #d4af37",
//                         borderRadius: "12px",
//                         backgroundColor: "#fefefe",
//                         fontFamily: "Arial, sans-serif"
//                     }}
//                 >
//                     <center>
//                         <img src={Logo} alt="BIU Logo" style={{ width: "80px", marginBottom: "10px" }} />
//                         <h3 style={{ color: "#d4af37", marginBottom: "5px" }}>Bujumbura International University</h3>
//                     </center>

//                     {renderLine()}
//                     <p><strong>Nom et Prénom:</strong> {`${event?.candidature?.NOM} ${event?.candidature?.PRENOM}`}</p>
//                     {renderLine()}
//                     <p><strong>Email:</strong> {event?.candidature?.EMAIL_PRIVE}</p>
//                     {renderLine()}
//                     <p><strong>Numéro Matricule:</strong> {event?.NUMERO_MATRICULE}</p>
//                     {renderLine()}
//                     <p><strong>Faculté:</strong> {event?.candidature?.classe?.departement?.faculte?.DESCRIPTION}</p>
//                     {renderLine()}
//                     <p><strong>Département:</strong> {event?.candidature?.classe?.departement?.DESCRIPTION}</p>
//                     {renderLine()}
//                     <p><strong>Classe:</strong> {event?.candidature?.classe?.DESCRIPTION}</p>
//                     {renderLine()}
//                     <p><strong>Année Académique:</strong> {event?.candidature?.ANNEE_ACADEMIQUE}</p>
//                     {renderLine()}

//                     <div style={{ marginTop: "20px", textAlign: "center" }}>
//                         <QRCode
//                             size={128}
//                             value={`${event?.NUMERO_MATRICULE}`}
//                             style={{ height: "auto", width: "130px" }}
//                         />
//                         <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>Code Étudiant</p>
//                     </div>
//                 </div>
//             </Dialog>
//         </div>
//     );
// }
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";
import logoBIU from "@/assets/biu-logo.jpg"; 
import { Avatar } from "primereact/avatar";
import { useRef } from "react";

export default function VoirCarteEtudiant({ visible, setVisible, event }) {

    const componentRef = useRef();

    let dateValidite = null;
    let estValide = false;
    let qrData = "";

    if (event?.DATE_INSERTION) {
        try {
            // Calcul de la date de validité (1 an après enregistrement dans etudiant)
            const dateInscription = new Date(event?.DATE_INSERTION);
            if (!isNaN(dateInscription.getTime())) {
                dateValidite = new Date(dateInscription);
                dateValidite.setFullYear(dateInscription.getFullYear() + 1);

                estValide = new Date() <= dateValidite;

                // Données encodées dans QR code
                qrData = JSON.stringify({
                    matricule: event?.NUMERO_MATRICULE,
                    nom: event?.candidature?.NOM,
                    prenom: event?.candidature?.PRENOM,
                    classe: event?.candidature?.classe?.DESCRIPTION,
                    validite: dateValidite.toISOString()
                })
            }
            
        } catch (error) {
            console.log("Erreur lors du traitement de la date:", error);
        }
    }

    

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Carte_Etudiant"
    });

    const ligneStyle = {
        borderBottom: "1px solid #ccc",
        padding: "4px 0",
        fontSize: "12px"
    };

    const renderLine = () => (
        <div style={{
            height: "1px",
            backgroundColor: "#ccc",
            margin: "8px 0"
        }} />
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={visible}
                maximizable
                modal
                onHide={() => setVisible(false)}
                style={{ width: "750px" }}
                header="Carte d'Étudiant"
                footer={
                <div className="flex justify-content-center">
                    <Button
                        onClick={handlePrint}
                        icon="pi pi-print"
                        label="Imprimer"
                        className="p-button-success"
                    />
                </div>
                }
            >
                <div ref={componentRef} style={{ padding: "20px", fontFamily: "Arial" }}>
                    {/* RECTO */}
                    <div style={{ display: "flex", border: "1px solid #ccc", padding: 10, marginBottom: 20 }}>
                        <div style={{ flex: 1, paddingRight: 10 }}>
                            {event?.candidature?.candidat?.IMAGE
                            ?
                            <img
                                src={event?.candidature?.candidat?.IMAGE}
                                alt="Photo profil"
                                style={{ width: 100, height: 120, border: "1px solid #ccc" }}
                            /> : <Avatar icon="pi pi-user" shape="circle" />}
                        </div>

                        <div style={{ flex: 2, paddingLeft: 10 }}>
                            <div style={ligneStyle}><b>Nom et Prénom:</b> {`${event?.candidature?.NOM} ${event?.candidature?.PRENOM}`}</div>
                            <div style={ligneStyle}><b>Email:</b> {event?.candidature?.EMAIL_PRIVE}</div>
                            <div style={ligneStyle}><b>Numéro matricule:</b> {event?.NUMERO_MATRICULE}</div>
                            <div style={ligneStyle}><b>Faculté:</b> {event?.candidature?.classe?.departement?.faculte?.DESCRIPTION}</div>
                            <div style={ligneStyle}><b>Département:</b> {event?.candidature?.classe?.departement?.DESCRIPTION}</div>
                            <div style={ligneStyle}><b>Classe:</b> {event?.candidature?.classe?.DESCRIPTION}</div>
                            <div style={ligneStyle}><b>Année académique:</b> {event?.candidature?.ANNEE_ACADEMIQUE}</div>
                            <div style={ligneStyle}><b>Validité:</b> {dateValidite? `jusqu'au ${dateValidite.toLocaleDateString()}` : "Inconnue"}</div>
                            <div style={{ marginTop: 15 }}>
                                <QRCode
                                    value={qrData}
                                    size={80}
                                    style={{ float: "right" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* VERSO */}
                    <div style={{ border: "1px solid #ccc", padding: 10 }}>
                        {/* <h5 style={{ textAlign: "center", color: "#8c6f14" }}>Règlement / Note Importante</h5> */}
                        <div className="flex justify-between items-start">
                            <img
                                src={logoBIU}
                                alt="Logo BIU"
                                style={{ width: "60px", height: "60px" }}
                                className="mx-6 mb-0"
                            />
                            <center>
                                <h5 className="text-blue-900 text-md font-bold">
                                Bujumbura International University
                                </h5>
                                <p className="italic text-gray-700 text-sm">
                                Excellence in Education for Development
                                </p>
                            </center>
                            <img
                                src={logoBIU}
                                alt="Logo BIU"
                                style={{ width: "60px", height: "60px" }}
                                className="mx-6 mb-0"
                            />
                        </div>
                        <div className="my-3 text-center bg-yellow-400 py-1 text-black font-bold border border-black">
                            CARTE D'ÉTUDIANT
                        </div>
                        <p style={{ fontSize: "12px", lineHeight: 1.5 }} className="text-center">
                        Cette carte est personnelle et non transférable. En cas de perte, le détenteur doit immédiatement
                        informer l'administration de l'université pour son remplacement. Elle a une durée de validité d'<b>un an</b>.<br/>
                        <center><b>Valable uniquement avec sceau et signature du Recteur de BIU.</b></center>
                        </p>
                        {renderLine()}
                        <p style={{ fontSize: "12px" }}>
                        📞 (+257) 22 27 85 33 <br /> 🌐 www.biu.bi <br /> ✉️ info@biu.bi
                        </p>

                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 30 }}>
                            <div style={{ textAlign: "center" }}>
                                <div style={{ borderTop: "1px solid #000", width: 150 }} />
                                <small>Signature du Recteur</small>
                            </div>

                            <div style={{ textAlign: "center" }}>
                                <div style={{ borderTop: "1px solid #000", width: 150 }} />
                                <small>Signature du l'étudiant</small>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}



// import React, { useRef } from "react";
// import { Button } from "primereact/button";
// import { Dialog } from "primereact/dialog";
// import QRCode from "react-qr-code";
// import { useReactToPrint } from "react-to-print";
// import logo from "@/assets/biu-logo.jpg";

// export default function VoirCarteEtudiant({ visible, setVisible, event }) {
//     const componentRef = useRef();
//     const handlePrint = useReactToPrint({
//         content: () => componentRef.current,
//         documentTitle: "Carte_Etudiant",
//     });

//     const ligneStyle = {
//         borderBottom: "1px solid #ccc",
//         padding: "4px 0",
//         fontSize: "12px"
//     };

//     return (
//         <div className="card flex justify-content-center">
//         <Dialog
//             visible={visible}
//             modal
//             onHide={() => setVisible(false)}
//             style={{ width: "700px", maxWidth: "100%" }}
//             header="Carte d'étudiant"
//             footer={
//             <div className="flex justify-content-center">
//                 <Button
//                 onClick={handlePrint}
//                 icon="pi pi-print"
//                 label="Imprimer"
//                 className="p-button-success"
//                 />
//             </div>
//             }
//         >
//             <div ref={componentRef} className="flex flex-col gap-5 p-4">
//                 {/* Recto */}
//                 <div style={{ display: "flex", border: "1px solid #ccc", padding: 10, marginBottom: 20 }}>
//                     <div style={{ flex: 1, paddingRight: 10 }}>
//                         <img src={logo} alt="Logo" style={{ height: 100, marginBottom: 10 }} />
//                             <h6 style={{ marginBottom: 10, color: "#8c6f14" }}>Bujumbura International University</h6>
//                                 <img
//                             src={event?.candidature?.PHOTO || "/default-avatar.jpg"}
//                             alt="Photo profil"
//                             style={{ width: 100, height: 120, border: "1px solid #ccc" }}
//                         />
//                     </div>

//                     <div style={{ flex: 2, paddingLeft: 10 }}>
//                         <div style={ligneStyle}><b>Nom et Prénom:</b> {`${event?.candidature?.NOM} ${event?.candidature?.PRENOM}`}</div>
//                         <div style={ligneStyle}><b>Email:</b> {event?.candidature?.EMAIL_PRIVE}</div>
//                         <div style={ligneStyle}><b>Numéro matricule:</b> {event?.NUMERO_MATRICULE}</div>
//                         <div style={ligneStyle}><b>Faculté:</b> {event?.candidature?.classe?.departement?.faculte?.DESCRIPTION}</div>
//                         <div style={ligneStyle}><b>Département:</b> {event?.candidature?.classe?.departement?.DESCRIPTION}</div>
//                         <div style={ligneStyle}><b>Classe:</b> {event?.candidature?.classe?.DESCRIPTION}</div>
//                         <div style={ligneStyle}><b>Année académique:</b> {event?.candidature?.ANNEE_ACADEMIQUE}</div>
//                         <div style={{ marginTop: 15 }}>
//                             <QRCode
//                             value={event?.NUMERO_MATRICULE || ""}
//                             size={80}
//                             style={{ float: "right" }}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Verso */}
//                 <div className="border-2 border-gray-300 rounded-md p-4 bg-white text-sm text-black relative">
//                     <div className="flex justify-between items-start">
//                     <div>
//                         <h2 className="text-blue-900 text-md font-bold">
//                         Bujumbura International University
//                         </h2>
//                         <p className="italic text-gray-700 text-sm">
//                         Excellence in Education for Development
//                         </p>
//                     </div>
//                     <img
//                         src={logo}
//                         alt="Logo BIU"
//                         style={{ width: "60px", height: "60px" }}
//                     />
//                     </div>
//                     <div className="my-3 text-center bg-yellow-400 py-1 text-black font-bold border border-black">
//                     CARTE D'ÉTUDIANT
//                     </div>
//                     <p className="text-xs text-center mb-2">
//                     Valable uniquement avec sceau et signature du Recteur de BIU
//                     </p>
//                     <p className="text-xs text-center mt-3 text-gray-600">
//                     6, Avenue du Cinquantenaire, Kigobe-Sud, Bujumbura<br />
//                     Tél: (+257) 22 27 85 33, Site web: <a href="https://www.biu.bi">www.biu.bi</a>, Email: info@biu.bi
//                     </p>
//                 </div>
//             </div>
//         </Dialog>
//         </div>
//     );
// }


