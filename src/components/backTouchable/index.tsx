import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const BackTouchable: React.FC = () => {
  const navigation = useNavigation();
  const handleNavigateBack = () => navigation.goBack();

  return (
    <TouchableOpacity onPress={handleNavigateBack}>
      <Icon name="arrow-left" size={20} color="#34cb79" />
    </TouchableOpacity>
  );
};

export default BackTouchable;
