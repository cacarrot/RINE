import React from "react";
import styled from "styled-components";
import styles from "../../styles/constants";
import send from "../../images/send.png";
import { useDispatch, useSelector } from "react-redux";
import { actions, STATE_KEY } from "../../redux/modules/talkModule";
import { MdPhoto } from "react-icons/md";
import ValsUtil from "../../utils/ValsUtil";
import "../../styles/vals.css";

type Props = {
  roomId: number;
};

export default (props: Props) => {
  const { roomId } = props;
  const dispatch = useDispatch();
  const draftText = useSelector((state: any) => {
    return state[STATE_KEY][roomId].draftText;
  });

  const handlePost = () => {
    const initializeMessage = ["init"];
    const valsMessage = ["バルス"];
    if (draftText === "") return;
    if (initializeMessage.indexOf(draftText) >= 0) {
      dispatch(actions.initialize({ roomId: roomId }));
    } else if (valsMessage.indexOf(draftText) >= 0) {
      ValsUtil.down();
    } else {
      dispatch(actions.postText(roomId, draftText));
    }
  };

  const handleTextChange = (event: any) => {
    dispatch(actions.changeText({ roomId: roomId, text: event.target.value }));
  };

  const handleTextKeyPress = (event: any) => {
    if (event.ctrlKey && event.key === "Enter") {
      handlePost();
    }
  };

  const handlePhotoChange = (event: any) => {
    dispatch(actions.postPhoto(roomId, event.target));
  };

  return (
    <Root>
      <Label>
        <ImageIcon />
        <ImageInput
          type="file"
          accept=".jpg,.gif,.png,image/gif,image/jpeg,image/png"
          onChange={handlePhotoChange}
        />
      </Label>
      <TextInput
        onChange={handleTextChange}
        onKeyPress={handleTextKeyPress}
        value={draftText}
      />
      <SendButton src={send} alt="Send" onClick={handlePost} />
    </Root>
  );
};

const Root = styled.div`
  /* Layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* Size */
  width: 100%;
  height: ${styles.FOOTER.HEIGHT};
  box-sizing: border-box;
  /* Color */
  background-color: #ffffff;
`;

const Label = styled.label``;

const ImageInput = styled.input`
  /* Layout */
  display: none;
`;

const ImageIcon = styled(MdPhoto)`
  /* Layout */
  flex-shrink: 0;
  flex-grow: 0;
  /* Size */
  width: auto;
  height: ${styles.FOOTER.INNER_HEIGHT};
  font-size: ${styles.FOOTER.FONT_SIZE};
  /* Color */
  color: #808080;
`;

const TextInput = styled.textarea`
  /* Layout */
  flex-shrink: 1;
  flex-grow: 1;
  /* Size */
  min-width: 0;
  width: auto;
  height: ${styles.FOOTER.INNER_HEIGHT};
  padding: 3px 10px;
  font-size: ${styles.FOOTER.FONT_SIZE};
  /* Color */
  background-color: #f6f6f6;
  /* Other */
  border: solid 1px #ececec;
  border-radius: 20px;
  outline: none;
  resize: none;
  white-space: pre-line;
`;

const SendButton = styled.img`
  /* Layout */
  flex-shrink: 1;
  flex-grow: 0;
  /* size */
  width: auto;
  height: ${styles.FOOTER.INNER_HEIGHT};
`;
