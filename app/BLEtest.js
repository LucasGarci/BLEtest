import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NativeAppEventEmittem } from 'react-native'
import { BleManager } from 'react-native-ble-plx';

export class BlueTest extends React.Component {
    constructor() {
        super()
        this.state = { bleState: 'NOT READY', devicesIds: [], names: [] }
        this.manager = new BleManager();
        this.disp1 = "No hay nada";
    }


}  