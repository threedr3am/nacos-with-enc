import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { Button, ConfigProvider, Field, Form, Input, Message } from '@alifd/next';
import PageTitle from '../../components/PageTitle';
import { changeLanguage } from '@/reducers/locale';
import changeTheme from '../../theme';
import { connect } from 'react-redux';
import { request } from '../../globalLib';

@connect(state => ({ ...state.locale }), { changeLanguage, changeTheme })
@ConfigProvider.config
class JasyptEncryptor extends Component {
  static displayName = 'JasyptEncryptor';

  static propTypes = {
    locale: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      originalText: '',
      cipherText: '',
    };
    this.field = new Field(this);
  }

  handleEncrypt = () => {
    const { originalText } = this.state;
    request({
      type: 'post',
      url: 'v1/console/jasypt/enc',
      contentType: 'application/x-www-form-urlencoded',
      data: {
        content: originalText,
      },
      success: res => {
        this.setState({ cipherText: res.data });
      },
      error: e => Message.error(e.responseText || 'error'),
    });
  };

  render() {
    const { locale = {} } = this.props;
    return (
      <>
        <PageTitle title={locale.settingTitle} />
        <div className="encryptor-box">
          <div className="text-box">
            <div className="input-text">
              <div className="setting-span">原文：</div>
              <Form field={this.field}>
                <Form.Item label={locale.originalText} required>
                  <Input
                    htmlType="textarea"
                    name="text"
                    onChange={value => {
                      this.setState({ originalText: value });
                    }}
                  />
                </Form.Item>
              </Form>
            </div>
            <div className="output-text">
              <div className="setting-span">密文：</div>
              <Form field={this.field}>
                <Form.Item label={locale.cipherText} required>
                  <Input value={this.state.cipherText} htmlType="text" name="cipherText" />
                </Form.Item>
              </Form>
            </div>
          </div>
          <Button type="primary" onClick={this.handleEncrypt}>
            加密
          </Button>
        </div>
      </>
    );
  }
}

export default JasyptEncryptor;
