import React, { useState, useRef, useEffect } from "react";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Fab,
  Tooltip,
} from "@mui/material";
import { styled, keyframes } from "@mui/system";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

const Container = styled(Paper)(({ theme }) => ({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  zIndex: "9999",
  backgroundColor: theme.palette.primary.main,
}));

const ChatContainer = styled("div")(({ theme }) => ({
  height: "400px",
  width: "320px",
  overflow: "auto",
  padding: theme.spacing(2),
  paddingTop: theme.spacing(2),
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  //maskImage: "linear-gradient(to top, white 90%, transparent 100%)",
}));

const ChatHeaderText = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  marginTop: theme.spacing(1),
  fontSize: 26,
}));

const ChatMessageContainer = styled("div")(({ chattype }) => ({
  display: "flex",
  justifyContent: chattype === "user" ? "flex-end" : "flex-start",
}));

const ChatMessage = styled(Typography)(({ theme, chattype }) => ({
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: "8px",
  maxWidth: "80%",
  wordBreak: "break-word",
  backgroundColor:
    chattype === "user"
      ? theme.palette.secondary.main
      : theme.palette.primary.CTblue,
  color: chattype === "user" ? "black" : "white",
  "& p": {
    margin: 0,
  },
}));

const BotTypingMessage = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const blinkingDots = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const BlinkingDots = styled("span")(({ theme }) => ({
  marginRight: theme.spacing(1),
  animation: `${blinkingDots} 1s infinite`,
}));

const Form = styled("form")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between ",
  margin: theme.spacing(2),
}));

const Input = styled(TextField)(({ theme }) => ({
  borderWidth: "1px",
  borderRadius: "8px",
  backgroundColor: "white",
}));

const SendButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.yellow.main,
  color: theme.palette.primary.main,
  // height: "56px",
  // borderRadius: "8px",
  fontSize: "16px",
  "&:hover": {
    color: theme.palette.yellow.main,
  },
}));

const CloseButton = styled(Button)({
  position: "absolute",
  top: "0px",
  right: "0px",
  color: "white",
});

const ChatBot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "bot",
      message:
        "Hi! 👋 I am your CapTain, your personal assistant! How can I help?",
    },
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const messagesContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userMessage = userInput.trim();
    if (userMessage === "") {
      return;
    }

    const userChat = { type: "user", message: userMessage };
    setChatHistory((prevChatHistory) => [...prevChatHistory, userChat]);

    setUserInput("");

    // Show typing indicator for 3 seconds
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { type: "bot", message: "..." },
    ]);
    setIsBotTyping(true);

    setTimeout(async () => {
      try {
        const response = await fetch(`https://${process.env.REACT_APP_DOMAIN_CHATBOT}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();

        const botChat = { type: "bot", message: data.bot_response };
        setChatHistory((prevChatHistory) =>
          prevChatHistory.map((chat) =>
            chat.message === "..." ? botChat : chat
          )
        );

        setIsBotTyping(false);
      } catch (error) {
        console.error(error);
      }
    }, 1000);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
    setTimeout(() => {
      scrollToBottom();
    }, 250);
  };

  const renderMarkdown = (message) => {
    const html = md.render(message);
    const modifiedHtml = html.replace(
      /<a href="cap-air\.com\b/g,
      `<a class="yellow-link" style="color: yellow;" href="${window.location.origin}`
    );
    return { __html: modifiedHtml };
  };

  return (
    <>
      {!isChatVisible && (
        <Tooltip title="Chat with CapTain" placement="left" arrow>
          <Fab
            className="no-print"
            onClick={toggleChatVisibility}
            sx={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: "9999",
              backgroundColor: "primary.main",
              fontSize: "16px",
              color: "yellow.main",
              "&:hover": { color: "primary.main" },
            }}
          >
            {isHovered ? "Chat!" : <ChatBubbleOutlineIcon />}
          </Fab>
        </Tooltip>
      )}
      {isChatVisible && (
        <ClickAwayListener onClickAway={() => setIsChatVisible(false)}>
          <Container elevation={10}>
            <CloseButton onClick={toggleChatVisibility}>
              <KeyboardArrowDownIcon fontSize="large" />
            </CloseButton>
            <ChatHeaderText
              variant="h4"
              align="left"
              fontWeight="bold"
              color="white.main"
            >
              CapTain 👨‍✈️
            </ChatHeaderText>
            <Typography
              fontSize="12px"
              align="left"
              color="white.main"
              sx={{
                marginLeft: "18px",
                marginBottom: "8px",
              }}
            >
              CapAir Chatbot
            </Typography>
            <Paper square elevation={0}>
              <ChatContainer>
                {chatHistory.map((chat, index) => (
                  <ChatMessageContainer
                    ref={messagesContainerRef}
                    key={index}
                    chattype={chat.type}
                  >
                    <ChatMessage
                      variant="body1"
                      chattype={chat.type}
                      dangerouslySetInnerHTML={renderMarkdown(
                        chat.type === "user"
                          ? `You: ${chat.message}`
                          : `CapTain: ${chat.message}`
                      )}
                    />
                  </ChatMessageContainer>
                ))}
                {isBotTyping && (
                  <ChatMessage
                    variant="body1"
                    className={`${BotTypingMessage}`}
                  >
                    <BlinkingDots>...</BlinkingDots>
                  </ChatMessage>
                )}
              </ChatContainer>
            </Paper>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                value={userInput}
                onChange={handleUserInput}
                placeholder="Enter your message"
                variant="outlined"
                autoComplete="off"
              />
              <SendButton type="submit" variant="contained" color="primary">
                Send
              </SendButton>
            </Form>
          </Container>
        </ClickAwayListener>
      )}
    </>
  );
};

export default ChatBot;
