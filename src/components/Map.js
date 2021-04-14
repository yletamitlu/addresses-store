import React from "react";
import {YMaps, Map} from "react-yandex-maps";
import {observer} from "mobx-react-lite";

const mapState = {
    center: [55.76, 37.64],
    zoom: 10,
    controls: []
};

function AddrMap() {
    return (
        <div>
            <YMaps query={{load: "package.full"}}>
                <Map
                    width="450px"
                    height="650px"
                    state={mapState}
                />
            </YMaps>
        </div>
    );
}

export default observer(AddrMap);
