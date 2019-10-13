import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { TalkItem } from "../../types/TalkItem";
import SpeechUtil from "../../utils/SpeechUtil";
import ClipboardUtil from "../../utils/ClipboardUtil";
import useLongPress from "../../hooks/useLongPress";
import { ImageDao, ImageItem } from "../../db/Image";
import FileUtil from "../../utils/FileUtil";
import Img from "../atoms/Img";

type Props = TalkItem;

export default (props: Props) => {
  const { value, userType, messageType, time, logo, name, imageId } = props;
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>("/loading.svg");

  const baloonEl = useRef<HTMLDivElement>(null);
  const photoEl = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (messageType === "photo" && imageId !== undefined) {
      if (imageId.startsWith("http")) {
        setImgSrc(imageId);
      } else {
        ImageDao.select(imageId, (item: ImageItem) => {
          if (
            item !== null &&
            item.value !== undefined &&
            item.value !== null
          ) {
            setImgSrc(item.value);
          } else {
            setImgSrc("/no_image.png");
          }
        });
      }
    }
  }, [messageType, imageId]);

  const handleBaloonLongPress = () => {
    const baloon = baloonEl.current;
    if (baloon == null) return;
    const text = baloon.textContent;
    if (text === undefined || text === null) return;
    if (window.confirm("Copy?")) {
      ClipboardUtil.copy(text);
      alert("Copy complete.");
    }
  };

  const baloonLongPress = useLongPress(handleBaloonLongPress, 1000);

  const handlePhotoLongPress = () => {
    const photo = photoEl.current;
    if (photo == null) return;
    if (window.confirm("Download?")) {
      FileUtil.download(photo, "photo.png");
    }
  };

  const photoLongPress = useLongPress(handlePhotoLongPress, 1000);

  const handleSpeak = () => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    const handleEnd = () => {
      setIsSpeaking(false);
    };
    if (value !== undefined) SpeechUtil.speak(value, handleEnd);
  };

  const getTextMessage = () => {
    switch (userType) {
      case "me":
        return (
          <RightMessageCard>
            <Time>{time}</Time>
            <RightBaloon
              ref={baloonEl}
              {...baloonLongPress}
              onClick={handleSpeak}>
              {value}
            </RightBaloon>
          </RightMessageCard>
        );

      default:
        return (
          <LeftMessageCard>
            <UserIcon src={logo} alt="logo" />
            <ColumnWrapper>
              <UserName>{name}</UserName>
              <LeftBaloon
                ref={baloonEl}
                {...baloonLongPress}
                onClick={handleSpeak}>
                {value}
              </LeftBaloon>
            </ColumnWrapper>
            <Time>{time}</Time>
          </LeftMessageCard>
        );
    }
  };

  const getPhotoMessage = () => {
    switch (userType) {
      case "me":
        return (
          <RightMessageCard>
            <Time>{time}</Time>
            <Photo
              ref={photoEl}
              {...photoLongPress}
              src={imgSrc}
              alt={imageId}
            />
          </RightMessageCard>
        );

      default:
        return (
          <LeftMessageCard>
            <UserIcon src={logo} alt="logo" />
            <ColumnWrapper>
              <UserName>{name}</UserName>
              <Photo
                ref={photoEl}
                {...photoLongPress}
                src={imgSrc}
                alt={imageId}
              />
            </ColumnWrapper>
            <Time>{time}</Time>
            <ColumnWrapper />
          </LeftMessageCard>
        );
    }
  };

  switch (messageType) {
    case "photo":
      return getPhotoMessage();

    case "text":
    default:
      return getTextMessage();
  }
};

// Common
const Time = styled.time`
  flex-grow: 0;
  flex-shrink: 0;
  color: #ffffff;
  font-size: 0.5rem;
  margin: 10px;
`;

const Photo = styled(Img)`
  width: 50vw;
  height: auto;
  position: relative;
  padding: 10px;
  border-radius: 12px;
`;

// Base
const Baloon = styled.div`
  display: inline-block;
  font-size: 1rem;
  word-wrap: break-word;
  white-space: pre-line;
  position: relative;
  padding: 6px 10px;
  border-radius: 8px;
`;

const MessageCard = styled.div`
  margin-bottom: 20px;
`;

// Left
const LeftMessageCard = styled(MessageCard)`
  display: flex;
  justify-content: flex-start;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 1;
  margin-left: 19px;
`;

const UserIcon = styled(Img)`
  flex-grow: 0;
  flex-shrink: 0;
  float: left;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const UserName = styled.span`
  width: 10px;
  color: #ffffff;
  font-size: 0.5rem;
`;

const LeftBaloon = styled(Baloon)`
  background-color: #ffffff;
  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 3px;
    left: -19px;
    border: 8px solid transparent;
    border-right: 18px solid #ffffff;
    transform: rotate(35deg);
  }
`;

// Right
const RightMessageCard = styled(MessageCard)`
  display: flex;
  justify-content: flex-end;
`;

const RIGHT_BALOON_COLOR = "#b3ec8d";
const RightBaloon = styled(Baloon)`
  background-color: ${RIGHT_BALOON_COLOR};
  &::after {
    content: "";
    position: absolute;
    top: 3px;
    right: -19px;
    border: 8px solid transparent;
    border-left: 18px solid ${RIGHT_BALOON_COLOR};
    -webkit-transform: rotate(-35deg);
    transform: rotate(-35deg);
  }
`;
