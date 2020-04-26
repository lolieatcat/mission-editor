
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
              <Button style={{ margin: "5px" }} onClick={this.onDownload}>保存...</Button>
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
              <Button style={{ margin: "auto", marginLeft: "10px" }} onClick={this.onUpload}>打开...</Button>
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
        <div className={styles.panel} style={{marginTop:"20px"}}>
          <h3>使用教程</h3>
          <p>这是一款完全独立的文字游戏编辑器，可以将内容导出成json文本，大家可以用它制作任何自己喜欢文字游戏~</p>
          <p>第一次加载可能有点慢，后面再打开就快了~</p>
          <p>完全开源免费哦~而且支持离线运行，也就是说网页打开以后，没有网络也能用。</p>
          <p>手机端的话，就横屏使用吧O(∩_∩)O哈哈~</p>
          <p>开源地址：<a href="https://github.com/molin0000/mission-editor">https://github.com/molin0000/mission-editor</a></p>
          <h3>闲话少说，让我们开始吧</h3>
          <p>1）点击新建按钮，可清空当前副本，请认真填写标题和作者信息（也可以不新建直接修改）；</p>
          <p>2) 在使用其他软件前或者编写完成后，请一定要点击保存按钮，将副本文件保存到本地；</p>
          <p>3）服务器是不会保存你的副本的哦，请自己认真保管副本文件；</p>
          <p>4）如果写到一半，想下次再写，也请点击保存，保存好文件，下次点打开按钮，打开后就可以继续写了；</p>
          <p>5) 结果中的.ra是扔一个1~100的骰子，ra数值等于你想要的成功率，小于你后面填写的数值，就是成功，大于是失败；</p>
          <p>6) 如果使用.ra选项，后面一定要紧跟.ra成功和.ra失败，成功和失败后面填写跳转的事件序号，成功未必需要好结果，失败也未必需要坏结果；</p>
          <p>7) 结果中的跳转，可以让剧情跳转到你写的另一条事件，请认真填写跳转到的事件序号，这直接关系到你的副本通过与否；</p>
          <p>8) 结果中的描述是过场文本，可以描述作出选择后发生的事项(其实写不写都可以)</p>
          <p>9) 描述内容直接在小方框中输入，必须有另一个结果在描述后出现；</p>
          <p>10) 同一个选项的结果是会从结果0开始顺序执行，所以结束必须排最尾；</p>
          <p>11) 如果结果选结束，或者没有结果，那么副本就默认结束了，请认真写跳转或者结束；</p>
          <p>12）其它的是属性的修改，可输入正值或负值，对于《序列战争》不建议数值过大，虽然数值策划会改；</p>
          <p>13) 副本总数值范围建议为：金镑[-500~+500], 经验[-200~+200], 灵性[-50~+50]</p>
          <p>14) 上一条只作参考，数值策划拥有最终解释权;</p>
          <p>15) 副本写好后，把保存的.json文件上载到作者群或者策划群的待审核文件夹就可以了；</p>
          <p>16) 大家都知道副本是谁写的，如果写的副本坑了人，请自求多福</p>
          <h3>再说几句闲话</h3>
          <p>序列战争群游戏插件的开源地址：<a href="https://github.com/molin0000/secretMaster">https://github.com/molin0000/secretMaster</a></p>
          <p>喜欢的话，可以在这里为作者空想之喵(molin)发电哦: <a href="https://afdian.net/@molin">https://afdian.net/@molin</a></p>
          <p>最初是作为诡秘之主QQ群游戏《序列战争》的副本编辑器来开发的，后来发现可以作为通用编辑器~</p>
          <p>喜欢诡秘之主的可以来QQ粉丝群:731419992，策划群:1028799086，游玩群:1030551041 </p>
        </div>
      </div>
    );
  }
}

export default MissionEditor;