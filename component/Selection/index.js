import { Component } from 'react';
import React from 'react';
import { Button, Input, Select } from 'antd';
import styles from './index.css';
const { Option } = Select;

class Selections extends Component {
  renderResult(result) {
    return (
      <div className={styles.flexInLine} style={{ padding: "3px" }} key={result.key}>
        <div style={{ width: "56px", margin: "auto", marginLeft: "5px" }}>结果1：</div>
        <Select style={{ width: "80px", margin: "auto", marginLeft: "5px" }} defaultValue={result.type}>
          <Option value=".ra">.ra</Option>
          <Option value="ra成功">ra成功</Option>
          <Option value="ra失败">ra失败</Option>
          <Option value="描述">描述</Option>
          <Option value="金镑">金镑</Option>
          <Option value="经验">经验</Option>
          <Option value="灵性">灵性</Option>
          <Option value="跳转">跳转</Option>
          <Option value="结束">结束</Option>
        </Select>
        <Input style={{ width: "100px", margin: "auto", marginLeft: "5px" }} defaultValue={result.data}/>
      </div>
    );
  }
  renderOption(value) {
    const results = value.results ? value.results : [];
    return (
      <div className={styles.border + ' ' + styles.flexInLine} style={{ margin: "10px -25px 0px 25px" }} key={value.key}>
        <div>
          <div className={styles.flexInLine} style={{ padding: "3px" }}>
            <div style={{ width: "68px", margin: "auto" }}>选项{value.key}：</div>
            <Input style={{ margin: "auto" }} defaultValue={value.desc}/>
          </div>
          <div style={{ padding: "3px" }}>
            <Button style={{ marginLeft: "52px" }}>添加结果</Button>
            <Button style={{ marginLeft: "11px" }}>减少结果</Button>
          </div>
        </div>
        <div>
          {
            results.map(result => {
              return this.renderResult(result);
            })
          }
        </div>
      </div>
    );
  }

  render() {
    const options = this.props.options ? this.props.options : [];
    return (
      <div>
        {
          options.map(value => {
            return this.renderOption(value);
          })
        }
      </div>
    );
  }
}

export default Selections;