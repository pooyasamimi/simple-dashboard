import { useEffect, useState } from "react";
import { jpAxios } from "../utils/JpAxios";

const Search = (MainComponent, route, searchBy) => {
    function NewComponent(props) {

        const [mainDatas, setMainDatas] = useState([]);
        const [datas, setDatas] = useState([]);
        const [text, setText] = useState("لطفا صبر کنید");
        useEffect(() => {
            getDatas();
        }, []);
        async function getDatas() {
            await jpAxios.get(`/${route}`).then((res) => {
                setMainDatas(res.data);
                setDatas(res.data);
            });
        }

        const handleSearch = event => {
            let filteredItems = datas.filter((post) =>
                post[searchBy].toLowerCase().includes(event.target.value.toLowerCase())
            )

            setMainDatas(
                filteredItems
            );
            setText('موردی یافت نشد')
        }


        return <MainComponent {...props} handleSearch={handleSearch} mainDatas={mainDatas} setMainDatas={setMainDatas} datas={datas} text={text} />
    }
    return NewComponent
}
export default Search