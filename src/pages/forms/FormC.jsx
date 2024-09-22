import useFetchFormsState from "../../components/states/FetchFormsState.jsx";
import Loading from "../../components/Loading.jsx";
import getJa from "../../utils/getJa.jsx";

const FormC = () =>{

    const {isLoading,data,error} = useFetchFormsState(3);

    return <div className={"flex flex-col"}>
        {
            isLoading && (
                <Loading/>
            )
        }

        {
            error && (
                <div className={"flex mt-20"}>
                    <p className={"text-red-400"}>{error}</p>
                </div>
            )
        }
        <div className={"fixed top-0 w-full text-center p-3 bg-gray-300 z-10 shadow-2xl"}>
            <p>Keller</p>
        </div>
        <div className={"flex mt-14 flex-col mx-2"}>
            {
                data && (
                    data.map((form, index) => (<div key={index} className={"flex shadow-sm p-2 m-1 rounded-md bg-gray-100"}>
                        <span className={"text-sm grid grid-cols-1 lg:grid-cols-2 w-full mx-2 justify-center"}>
                            <div className={"col-span-1"}>
                            <p>Name :<b>{form.name}</b></p>
                            <p>Rundgang Datum : <b>{form.rundgang}</b></p>
                            <p>Objekt / Straße : <b>{form.state}</b></p>
                            <p>Sauberkeit : <b>{form.sauberkit}</b></p>
                            <p>Rohrleitung auf Dichtigkeit OPTISCH prüfen (bei Schäden Fotos) : <b>{getJa(form.checkbox1)}</b></p>
                            <p>Alle Brandschutztüren prüfen (selbstständige Schließung) : <b>{getJa(form.checkbox2)}</b></p>
                            <p>Rückspülfilter/Wasserfilter (Reinigung alle 14 Tage bestätigen) : <b>{getJa(form.checkbox3)}</b></p>
                                                        <p>Location : <a className={"text-blue-500"}
                                                                         href={`https://www.google.com/maps?q=${form.lat},${form.lon}`}><b>Click to View</b></a></p>

                            </div>
                            <div className={"col-span-1 justify-center flex flex-col"}>
                                <p>Email : <b>{form.user_email}</b></p>
                            <div className={"shadow-sm rounded-md bg-white text-center"}>
                                <img src={form.signature} alt={"Signature"} className={"w-96"} />
                                <b>Signature</b>
                            </div>
                            </div>
                        </span>

                    </div>))
                )
            }

        </div>

    </div>
}

export default FormC