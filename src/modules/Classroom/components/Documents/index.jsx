import React, { useEffect, useState } from 'react';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import firebase from "firebase";
import ScrollToBottom from 'react-scroll-to-bottom';
import uuid from 'uuid/v1';
import FileBase64 from 'react-file-base64';
import { documentData } from '../../helpers/fakeData';

const Documents = props => {
  const [documentList, setDocumentsList] = useState([]);

  useEffect(() => {
    const documents = firebase.database()
      .ref('documents')
      .child(`${props.room}`);
    documents.on('value', documentsSuccess, documentsError);
  }, []);
  const documentsSuccess = data => {
    if (data.val() != null) {
      setDocumentsList(Object.values(data.val()))
    }
  }
  const documentsError = data => {
    console.log('error', data)
  }

  const getFiles = files => {
    console.log(files)
    files.map(file => {
      const base64 = file.base64.split(',')
      const storageRef = firebase.storage().ref('classroom/documents').child(file.name)
      storageRef
        .putString(base64[1], 'base64', { contentType: file.type }).then(result => {
          return storageRef.getDownloadURL().then(downloadURL => {
            const data = {
              url: downloadURL,
              file
            }
            saveFiles(data)
          });
        }).catch(error => console.log(error))
    })
  }
  const saveFiles = data => {
    console.log(data, 'data')
    firebase.database()
      .ref('documents')
      .child(`${props.room}/${uuid()}`)
      .set({
        url: data.url,
        fileName: data.file.name,
        type: data.file.type
      })
      .then(() => {
        console.log('success')
      });
  }
  return (
    <section className="documents-section">
      <h1 className="title">
        <Icon type="book" /> DOCUMENTS
    </h1>
      <ScrollToBottom className="content-container">
        <div className="contents">
          {documentList.map((item, index) => (
            <Button className="item" href={item.url} target="_blank" key={item.id}>
              <Icon type="file-text" className="item-icon" />
              <span className="item-title">{item.fileName}</span>
            </Button>
          ))}
          <FileBase64
            multiple={true}
            onDone={getFiles} />
        </div>
      </ScrollToBottom>
    </section>
  )
}

export default Documents;
