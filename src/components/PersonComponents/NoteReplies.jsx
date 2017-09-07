import React, {Component} from "react";
import {Input, Button, message} from "antd";
import {HttpUtils} from "../../utils/HttpUrilsLocal.js";
import {encryptionDatagram} from "../../utils/Tools.js";
import API from "../../apis/API.js";
import "react-quill/dist/quill.snow.css"; // snow
class NoteReplies extends Component {
    state = {
        content: ""
    };
    textreaValue = (e) => {
        this.setState({content: e.target.value})
    }
    render() {
        const {TextArea} = Input;
        console.log(this.props)
        const {author_id, note_id, nickname, replies, router} = this.props;
        return <div className="NoteReplies" style={{
            marginTop: '100px'
        }}>

            <h2>留言区</h2>
            <TextArea
                placeholder="点评下这篇文章"
                onChange={this.textreaValue}
                autosize={{
                minRows: 7,
                maxRows: 6
            }}/>
            <Button
                type="primary"
                onClick={async() => {
                if (!this.state.content) {
                    message.error('评论不能为空！');
                    return;
                }
                const encrypAuthorId = encryptionDatagram(author_id);
                const encrypUserId = encryptionDatagram(localStorage.getItem('user_id'));
                const request = await HttpUtils.axios(API.Local.baseUrl, API.Local.addreplie_post, 'post', {encrypAuthorId, encrypUserId, note_id, nickname, content: this.state.content});
                if (request.data.status === 200) {
                    message.success('评论成功');
                    router.go(0);
                } else {
                    message.error('评论失败')
                }
            }}>提交</Button>
            <h2>评论区</h2>
            <hr
                style={{
                background: '#ccc',
                border: '#fff solid 1px',
                height: '1px',
                marginBottom: '30px'
            }}/>
            <ul>
                {replies.map((item, index) => {
                    return <li
                        key={index}
                        style={{
                        marginTop: '25px'
                    }}>
                        <div
                            style={{
                            display: 'flex'
                        }}>
                            <div>
                                <svg
                                    style={{
                                    width: '60px',
                                    height: '60px'
                                }}
                                    className="user"
                                    aria-hidden="true">
                                    <use xlinkHref="#icon-icon"/>
                                </svg>
                            </div>
                            <div
                                style={{
                                flexDirection: ' row-reverse ',
                                flex: 1,
                                paddingLeft: '10px',
                                boxSizing: 'border-box'
                            }}>
                                <h4
                                    style={{
                                    flex: 1,
                                    fontSize: '15px'
                                }}>
                                    {item.nickname}</h4>
                                <h4
                                    style={{
                                    flex: 1,
                                    fontSize: '15px'
                                }}>
                                    {item.content}</h4>
                                <h4
                                    style={{
                                    height: '12px',
                                    fontSize: '12px'
                                }}>
                                    {item.create_at}</h4>
                            </div>
                            <div>
                                <svg
                                    style={{
                                    width: '20px',
                                    height: '20px',
                                    cursor: 'pointer'
                                }}
                                    className="ups"
                                    aria-hidden="true">
                                    <use xlinkHref="#icon-dianzan"/>
                                </svg>
                            </div>
                        </div>
                    </li>
                })}
            </ul>

        </div>
    }
}
export default NoteReplies;
