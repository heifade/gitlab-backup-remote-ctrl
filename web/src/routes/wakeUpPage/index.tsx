import React, { Dispatch, useRef, useEffect } from "react";
import { connect } from "dva";
import styles from "./styles.less";
import { Button, Card } from "antd";
import { NAMESPACE, IModalState } from "./modal";
import { WakeUp } from "./services";

interface IProps {
  dispatch: Dispatch<any>;
  pageStore: IModalState;
}

const wakeUp = new WakeUp();

function Component(props: IProps) {
  const {
    dispatch,
    pageStore: { loadding, message, messageColor },
  } = props;

  const textAreaRef = useRef<HTMLTextAreaElement>();

  const onClick = () => {
    wakeUp.wakeUp();
    dispatch({
      type: `${NAMESPACE}/onStart`,
      payload: {},
    });
    wakeUp.onMessage = (msg) => {
      dispatch({
        type: `${NAMESPACE}/onReceiveMessage`,
        payload: {
          msg,
        },
      });
    };
    wakeUp.onClose = () => {
      dispatch({
        type: `${NAMESPACE}/onFinish`,
        payload: {},
      });
    };
  };

  useEffect(() => {
    const text = textAreaRef.current!;

    text.scroll(0, text.scrollHeight);
  });

  return (
    <Card
      className={styles.card}
      bodyStyle={{ padding: 0 }}
      type="inner"
      title="唤醒服务器"
      extra={
        <Button type="primary" onClick={onClick} loading={loadding}>
          立即唤醒
        </Button>
      }
    >
      <textarea ref={textAreaRef} className={styles.txt} style={{ color: messageColor }} value={message}></textarea>
    </Card>
  );
}

export default connect((pars: any) => {
  return {
    pageStore: pars[NAMESPACE],
  };
})(Component);
