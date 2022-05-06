import { readdir, writeFile } from 'fs';
import * as vscode from 'vscode';
import { join } from 'path';
import { promisify } from 'util';

const indexFileExt = '.tsx';

const genFile = async(dir: string,fileName:string | undefined) =>{
  if(!fileName || fileName===''){
    vscode.window.showErrorMessage('文件名不能为空');
    return;
  }
  // 得到目录下所有文件名集合
  const result = await promisify(readdir)(dir); 
  if(result.indexOf(fileName+'.tsx') !== -1){
    vscode.window.showErrorMessage('文件名已存在');
    return;
  }
  const content=`
import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DeprecatedNavigator, TYText, Utils } from 'tuya-panel-kit';
import String from '@i18n';
import Res from '@res';
import { useIoTUIValue } from '@models';

const { convertX: cx } = Utils.RatioUtils;
interface MainProps {
  navigator: DeprecatedNavigator;
}

const Pages: React.FC<MainProps> = () => {
  const fontColor = useIoTUIValue('fontColor');
  const background = useIoTUIValue('background');

  return <View style={styles.main} />;
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
});
export default Pages;
  `;

  // 写入文件夹下
  await promisify(writeFile)(join(dir, fileName + indexFileExt), content);
};
export default genFile;