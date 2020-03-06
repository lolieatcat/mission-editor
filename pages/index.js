
import React from 'react';
import { Button, Input, Table } from 'antd';
import Selection from '../component/Selection';
import styles from './index.css';
import example from '../Mission/modal.json';
const { TextArea } = Input;

class MissionEditor extends React.Component {
  columns = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'index',
      width: "50px"
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      ellipsis: true
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      data: example,
      selectIndex: 0,
    }
  }

  onRowClick = (key) => {
    console.log('key:', key);
    this.setState({ selectIndex: key });
  }

  onDownload = () => {
    var d = Object.assign({}, this.state.data);
    d.date = (new Date()).toJSON();
    var datastr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(d, null, 2));
    var downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href", datastr);
    downloadAnchorNode.setAttribute("download", this.state.data.title + '_' + this.state.data.author + '.json')
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  onNewMission = () => {
    this.setState({ data: { events: [] } });
  }

  onUploadCheck = () => {
    let up = document.getElementById('up');
    if (up.value) {
      clearInterval(this.timer);

      var reader = new FileReader();//新建一个FileReader
      reader.readAsText(up.files[0], "UTF-8");//读取文件
      reader.onload = (evt) => { //读取完文件之后会回来这里
        var fileString = evt.target.result; // 读取文件内容
        console.log('fileString', fileString);
        let obj = JSON.parse(fileString);
        this.setState({ data: obj });
        up.value = "";
      }
    }
  }

  onUpload = () => {
    let up = document.getElementById('up');
    console.log('up', up);
    up.click();
    this.timer = setInterval(this.onUploadCheck, 1000);
  }

  onOptionDescChange = (key, e) => {
    console.log('onOptionDescChange', key, e.target.value);
    let data = Object.assign({}, this.state.data);
    data.events[this.state.selectIndex].options = data.events[this.state.selectIndex].options ? data.events[this.state.selectIndex].options : [];
    data.events[this.state.selectIndex].options[key].desc = e.target.value;
    this.setState({data});

  }

  onSelectChange = (optionKey, resultKey, e) => {
    console.log('onSelectChange', optionKey, resultKey, e);
    console.log('onResultChange', optionKey, resultKey);
    let data = Object.assign({}, this.state.data);
    data.events[this.state.selectIndex].options = data.events[this.state.selectIndex].options ? data.events[this.state.selectIndex].options : [];
    data.events[this.state.selectIndex].options[optionKey].results = data.events[this.state.selectIndex].options[optionKey].results ? data.events[this.state.selectIndex].options[optionKey].results : [];
    data.events[this.state.selectIndex].options[optionKey].results[resultKey].type = e;
    this.setState({data});
  }

  onAddResult = (key) => {
    console.log('onAddResult', key);
    let data = Object.assign({}, this.state.data);
    data.events[this.state.selectIndex].options = data.events[this.state.selectIndex].options ? data.events[this.state.selectIndex].options : [];
    data.events[this.state.selectIndex].options[key].results = data.events[this.state.selectIndex].options[key].results ? data.events[this.state.selectIndex].options[key].results : [];
    data.events[this.state.selectIndex].options[key].results.push({
      key:data.events[this.state.selectIndex].options[key].results.length, 
      type:"结束",
      data:""
    });

    this.setState({data});
  }

  onRemoveResult = (key) => {
    console.log('onRemoveResult', key);
    let data = Object.assign({}, this.state.data);
    data.events[this.state.selectIndex].options = data.events[this.state.selectIndex].options ? data.events[this.state.selectIndex].options : [];
    data.events[this.state.selectIndex].options[key].results = data.events[this.state.selectIndex].options[key].results ? data.events[this.state.selectIndex].options[key].results : [];
    data.events[this.state.selectIndex].options[key].results.pop();
    this.setState({data});
  }

  onResultChange = (optionKey, resultKey, e) => {
    console.log('onResultChange', optionKey, resultKey);
    let data = Object.assign({}, this.state.data);
    data.events[this.state.selectIndex].options = data.events[this.state.selectIndex].options ? data.events[this.state.selectIndex].options : [];
    data.events[this.state.selectIndex].options[optionKey].results = data.events[this.state.selectIndex].options[optionKey].results ? data.events[this.state.selectIndex].options[optionKey].results : [];
    data.events[this.state.selectIndex].options[optionKey].results[resultKey].data = e.target.value;
    this.setState({data});
  }

  render() {
    const data = this.state.data;
    const idx = this.state.selectIndex;
    const eventDesc = data.events.length > idx ? data.events[idx].desc : '';
    const options = data.events.length > idx ? data.events[idx].options : [];
    return (
      <div className={styles.normal}>
        <h1 className={styles.h1}>文字游戏副本编辑器</h1>
        <img style={{ height: "20px", marginTop: "-20px" }} src='https://img.shields.io/badge/Designed By-空想之喵-green.svg' />
        <div className={styles.panel}>
          <h3 className={styles.h3}>副本信息</h3>
          <div className={styles.line1 + " " + styles.flexInLine}>
            <div className={styles.col1}>
              <Button style={{ margin: "5px" }} onClick={this.onNewMission}>新建</Button>
              <Button style={{ margin: "5px" }} onClick={this.onDownload}>下载...</Button>
            </div>
            <div className={styles.flexInLine}>
              <div style={{ width: "60px", margin: "auto" }}>标题：</div>
              <Input style={{ margin: "auto", width: "150px" }} value={data.title} onChange={(e) => {
                let data = Object.assign({}, this.state.data);
                data.title = e.target.value;
                this.setState({ data });
              }} />
              <div style={{ width: "60px", margin: "auto" }}>作者：</div>
              <Input style={{ margin: "auto", width: "150px" }} value={data.author} onChange={(e) => {
                let data = Object.assign({}, this.state.data);
                data.author = e.target.value;
                this.setState({ data });
              }} />
              <div style={{ height: "0px", overflow: "hidden", position: "absolute" }}>
                <input type="file" id="up" /></div>
              <Button style={{ margin: "auto", marginLeft: "10px" }} onClick={this.onUpload}>上传...</Button>
            </div>
          </div>
          <h3 className={styles.h3}>事件设计</h3>
          <div className={styles.line2 + " " + styles.flexInLine}>
            <div className={styles.col1}>
              <Table columns={this.columns} size="small" dataSource={data.events}
                onRow={record => {
                  return {
                    onClick: event => {
                      this.onRowClick(record.key);
                    }, // 点击行
                  };
                }}
              />
            </div>
            <div>
              <div className={styles.flexInLine}>
                <div style={{ width: "120px", margin: "auto" }}>事件编号：</div>
                <Input style={{ margin: "auto", width: "300px" }} disabled value={this.state.selectIndex} />
                <Button style={{ margin: "auto", marginLeft: "10px" }} onClick={
                  () => {
                    let data = Object.assign({}, this.state.data);
                    data.events.push({ key: data.events.length, desc: "" });
                    this.setState({ data, selectIndex: data.events.length - 1 });
                  }
                }>新建事件</Button>
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ textAlign: "left", margin: "10px 0px 0px 25px" }}>事件描述：</div>
                <TextArea style={{ margin: "10px 0px 0px 25px", height: "60px" }} value={eventDesc} onChange={(e) => {
                  let data = Object.assign({}, this.state.data);
                  data.events[this.state.selectIndex].desc = e.target.value;
                  this.setState({ data });
                }} />
                <Button style={{ margin: "10px 0px 10px 25px" }} onClick={
                  () => {
                    let data = Object.assign({}, this.state.data);
                    data.events[idx].options = data.events[idx].options ? data.events[idx].options : [];
                    data.events[idx].options.push({ key: data.events[idx].options.length, desc: "", results: [] });
                    this.setState({ data });
                  }
                } >添加选项</Button>
                <Button style={{ margin: "10px 0px 10px 10px" }} onClick={
                  () => {
                    let data = Object.assign({}, this.state.data);
                    data.events[idx].options.pop();
                    this.setState({ data });
                  }
                } >减少选项</Button>
                <Selection options={options}
                  onOptionDescChange={this.onOptionDescChange}
                  onSelectChange={this.onSelectChange}
                  onAddResult={this.onAddResult}
                  onRemoveResult={this.onRemoveResult}
                  onResultChange={this.onResultChange} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.panel}></div>
      </div>
    );
  }
}

export default MissionEditor;