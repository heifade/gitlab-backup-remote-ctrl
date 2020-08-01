import React, { Dispatch, useRef, useEffect } from "react";
import { connect } from "dva";
import styles from "./styles.less";
import { Button, Card } from "antd";
import { NAMESPACE, IModalState } from "./modal";
import { Backup } from "./services";

interface IProps {
  dispatch: Dispatch<any>;
  pageStore: IModalState;
}

const backup = new Backup();

function Component(props: IProps) {
  const {
    dispatch,
    pageStore: { loadding, message, messageColor },
  } = props;

  const textAreaRef = useRef<HTMLTextAreaElement>();

  const onClick = () => {
    backup.backup();
    dispatch({
      type: `${NAMESPACE}/onStart`,
      payload: {},
    });
    backup.onMessage = (msg) => {
      dispatch({
        type: `${NAMESPACE}/onReceiveMessage`,
        payload: {
          msg,
        },
      });
    };
    backup.onClose = () => {
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
      title="备份"
      extra={
        <Button type="primary" onClick={onClick} loading={loadding}>
          立即备份
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
