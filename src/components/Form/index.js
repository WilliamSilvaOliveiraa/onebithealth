import React, { useState } from "react";
import { View, Text, TextInput, Button, Vibration } from "react-native";
import ResultImc from "./ResultImc";
import styles from "./ResultImc/style";

export default function Form() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState("Preencha o peso e a altura");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");
  const [errorMessage, setErrorMessage] = useState(null);

  function imcCalculator() {
    return setImc((weight / (height * height)).toFixed(2));
  }

  function verificationImc() {
    if (imc == null) {
      Vibration.vibrate();
      setErrorMessage("Campo obrigatório*");
    }
  }

  function validationImc() {
    if (weight != null && height != null) {
      imcCalculator();
      setHeight(null);
      setWeight(null);
      setMessageImc("Seu imc é igual:");
      setTextButton("Calcular Novamente");
      setErrorMessage(null);
      return;
    }
    verificationImc();
    setImc(null);
    setTextButton("Calcular");
    setMessageImc("Preencha o peso e altura");
  }

  return (
    <View>
      <View>
        <Text>Altura</Text>
        <TextInput
          placeholder="Ex. 1.75"
          keyboardType="numeric"
          onChangeText={setHeight}
          value={height}
        />
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <Text>Peso</Text>
        <TextInput
          placeholder="Ex. 75.365"
          keyboardType="numeric"
          onChangeText={setWeight}
          value={weight}
        />
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <Button title={textButton} onPress={() => validationImc()} />
      </View>
      <ResultImc messageResultImc={messageImc} resultImc={imc} />
    </View>
  );
}
