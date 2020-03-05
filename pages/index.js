
import React from 'react';
import {Button, Input, Table} from 'antd';
import Selection from '../component/Selection';
import styles from './index.css';
import example from '../Mission/modal.json';
const {TextArea} = Input;

class MissionEditor extends React.Component{
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

    this.state={
      data: example,
      selectIndex:0,
    }
  }
  
  render() {
    const data = this.state.data;
    const idx = this.state.selectIndex;
    const eventDesc = data.events.length > idx ? data.events[idx].desc : '';
    const options = data.events.length > idx ? data.events[idx].options : [];
    return (
      <div className={styles.normal}>
        <h1 className={styles.h1}>序列战争 - 副本编辑器</h1>
        <div className={styles.panel}>
          <h3 className={styles.h3}>副本信息</h3>
          <div className={styles.line1 + " " + styles.flexInLine}>
            <div className={styles.col1}>
              <Button style={{margin:"5px"}}>新建副本</Button>
              <Button style={{margin:"5px"}}>保存副本</Button>
            </div>
            <div className={styles.flexInLine}>
              <div style={{width: "120px", margin:"auto"}}>副本标题：</div>
              <Input style={{margin:"auto", width: "300px"}} defaultValue={data.title}/>
              <Button style={{margin:"auto", marginLeft:"10px"}}>加载</Button>
            </div>
          </div>
          <h3 className={styles.h3}>事件设计</h3>
          <div className={styles.line2 + " " + styles.flexInLine}>
            <div className={styles.col1}>
              <Table columns={this.columns} size="small" dataSource={data.events}/>
            </div>
            <div>
              <div className={styles.flexInLine}>
                <div style={{width: "120px", margin:"auto"}}>事件编号：</div>
                <Input style={{margin:"auto", width: "300px"}} disabled defaultValue={this.state.selectIndex}/>
                <Button style={{margin:"auto", marginLeft:"10px"}}>保存事件</Button>
              </div>
              <div style={{textAlign:"left"}}>
                <div style={{textAlign:"left", margin:"10px 0px 0px 25px"}}>事件描述：</div>
                <TextArea style={{margin:"10px 0px 0px 25px", height:"60px"}} defaultValue={eventDesc}/>
                <Button style={{margin:"10px 0px 10px 25px" }}>添加选项</Button>
                <Button style={{margin:"10px 0px 10px 10px" }}>减少选项</Button>
                <Selection options={options}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MissionEditor;