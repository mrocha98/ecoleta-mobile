import { FontAwesome as FaIcon, Feather as FeIcon } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import BackTouchable from '../../components/backTouchable';
import api from '../../services/api';
import { DetailParams, Data } from '../../types';
import styles from './styles';

const Detail: React.FC = () => {
  const [data, setData] = useState<Data>({} as Data);
  const route = useRoute();
  const routeParams = route.params as DetailParams;
  const defaultText = 'Tenho interesse na coleta de resíduos!';

  useEffect(() => {
    async function loadData() {
      const req = await api.get<Data>(`points/${routeParams.point_id}`);
      setData(req.data);
    }
    loadData();
  }, [routeParams.point_id]);

  const handleComposeMail = () => MailComposer.composeAsync({ subject: defaultText, recipients: [data.point.email] });

  const handleWhatsapp = () => Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=${defaultText}`);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <BackTouchable />
        {data.point && (
          <>
            <Image
              style={styles.pointImage}
              source={{
                uri: data.point.image_url,
              }}
            />

            <View style={styles.pointInfo}>
              <Text style={styles.pointName}>{data.point.name}</Text>
              <Text style={styles.pointItems}>{data.items.map((item) => item.title).join(', ')}</Text>
            </View>

            <View style={styles.address}>
              <Text style={styles.addressTitle}>Endereço</Text>
              <Text style={styles.addressContent}>
                {data.point.city}, {data.point.uf}
              </Text>
            </View>

            <View style={styles.footer}>
              <RectButton style={styles.button} onPress={handleWhatsapp}>
                <FaIcon name="whatsapp" size={20} color="#FFF" />
                <Text style={styles.buttonText}>Whatsapp</Text>
              </RectButton>

              <RectButton style={styles.button} onPress={handleComposeMail}>
                <FeIcon name="mail" size={20} color="#FFF" />
                <Text style={styles.buttonText}>E-Mail</Text>
              </RectButton>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Detail;
