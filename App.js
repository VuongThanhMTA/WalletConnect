/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  withWalletConnect,
  useWalletConnect,
} from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const connector = useWalletConnect(); // valid
  const [wallet, setwallet] = useState(null);

  const handleConnect = () => {
    console.log('CONNECT',connector)

    if (connector.connected) {
      connector.killSession()
    } else {
      connector.connect();
      connector.on('connect', (error, payload) => {
        console.log('CONNECTED', payload)
      })
    }

  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleConnect} style={styles.btnConnect}>
        <Text style={styles.text}>{connector.connected ? 'Disconnet' : 'Connect'}</Text>
        {/* <Text>{wallet}</Text> */}
      </TouchableOpacity>
    </View>
  )
}

export default withWalletConnect(App, {
  clientMeta: {
    description: "Connect with WalletConnect",
  },
  redirectUrl:
    Platform.OS === "web" ? window.location.origin : "yourappscheme://",
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnConnect: {
    backgroundColor: '#F44333',
    padding: 10,
    borderRadius: 10
  },
  text: {
    color: 'white'
  }
});
