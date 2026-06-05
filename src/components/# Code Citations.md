# Code Citations

## License: unknown
https://github.com/zesty-io/manager-ui/blob/8c6e959d8b994e1493693c95ac417968a8cf1514/src/shell/components/ResizeableContainer.tsx

```
```jsx
import {
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";

import api
from "../services/api";

import {
  useAuth
} from "../context/AuthContext";

import {
  FaRobot,
  FaTimes
} from "react-icons/fa";

function ATSAssistant({ reportId }) {

  const [isOpen,
    setIsOpen] =
    useState(false);

  const {
    token,
    user
  } = useAuth();

  const effectiveReportId =
    reportId ||
    (typeof window !== "undefined"
      ? localStorage.getItem("latestReportId")
      : null);

  const [messages,
    setMessages] =
    useState([]);

  const [input,
    setInput] =
    useState("");

  const messagesEndRef =
    useRef(null);

  const [loading,
    setLoading] =
    useState(false);

  const [position,
    setPosition] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "atsBotPosition"
        );

      return saved
        ? JSON.parse(saved)
        : {
            x:
              window.innerWidth - 120,
            y:
              window.innerHeight - 120
          };

    });

  const [dragging,
    setDragging] =
    useState(false);

  const [offset,
    setOffset] =
    useState({
      x: 0,
      y: 0
    });

  useEffect(() => {

    localStorage.setItem(

      "atsBotPosition",

      JSON.stringify(position)

    );

  }, [position]);

  const handleMouseDown =
    useCallback((e) => {

      setDragging(true);

      setOffset({

        x:
          e.clientX -
          position.x,

        y:
          e.clientY -
          position.y

      });

    }, [position]);

  const handleMouseMove =
    useCallback((e) => {

      if (!dragging)
        return;

      setPosition({

        x: Math.max(
          0,
          Math.min(
            window.innerWidth - 70,
            e.clientX - offset.x
          )
        ),

        y: Math.max(
          0,
          Math.min(
            window.innerHeight - 70,
            e.clientY - offset.y
          )
        )

      });

    }, [dragging, offset]);

  const handleMouseUp =
    useCallback(() => {

      setDragging(false);

    }, []);

  const handleQuickAction =
    useCallback(
      async (question) => {

        if (!token) {
          return;
        }

        setInput("");

        setMessages(
          prev => [
            ...prev,
            {
              sender: "user",
              text: question
            }
          ]
        );

        setLoading(true);

        try {

          const payload = {
            message: question
          };

          if (effectiveReportId) {
            payload.reportId =
              effectiveReportId;
          }

          const response =
            await api.post(

              "/chat",

              payload,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setMessages(
            prev => [
              ...prev,
              {
                sender: "bot",
                text:
                  response.data.reply
              }
            ]
          );

        } catch {

          setMessages(
            prev => [
              ...prev,
              {
                sender: "bot",
                text:
                  "Sorry, I am unable to respond right now."
              }
            ]
          );

        } finally {

          setLoading(false);

        }

      },
      [token, effectiveReportId]
    );

  const handleSend =
    useCallback(
      async () => {

        if (!token) {
          return;
        }

        if (
          !input.trim()
        )
          return;

        const userMessage =
          input;

        setMessages(
          prev => [
            ...prev,
            {
              sender:
                "user",
              text:
                userMessage
            }
          ]
        );

        setInput("");

        setLoading(true);

        try {

          const payload = {
            message:
              userMessage
          };

          if (effectiveReportId) {
            payload.reportId =
              effectiveReportId;
          }

          const response =
            await api.post(

              "/chat",

              payload,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setMessages(
            prev => [
              ...prev,
              {
                sender:
                  "bot",
                text:
                  response.data.reply
              }
            ]
          );

        } catch (error) {

          setMessages(
            prev => [
              ...prev,
              {
                sender:
                  "bot",
                text:
                  "Sorry, I am unable to respond right now."
              }
            ]
          );

        } finally {

          setLoading(false);

        }

      },
      [token, input, effectiveReportId]
    );

  useEffect(() => {

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseup",
      handleMouseUp
    );

    return () => {

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );

    };

  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {

    if (user && token) {

      const hasReport =
        localStorage.getItem(
          "latestReportId"
        );

      setMessages([
        {
          sender: "bot",

          text: hasReport

          ?

`Hi ${user.name} 👋

I can see you've analyzed a resume recently.

I can explain
```


## License: unknown
https://github.com/cenoroid/botoroid-react-app-viewer/blob/e184ee325446c4c8054609e4a3f5d54a5c9a190c/src/components/hooks/useGetBlockedArea.js

```
```jsx
import {
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";

import api
from "../services/api";

import {
  useAuth
} from "../context/AuthContext";

import {
  FaRobot,
  FaTimes
} from "react-icons/fa";

function ATSAssistant({ reportId }) {

  const [isOpen,
    setIsOpen] =
    useState(false);

  const {
    token,
    user
  } = useAuth();

  const effectiveReportId =
    reportId ||
    (typeof window !== "undefined"
      ? localStorage.getItem("latestReportId")
      : null);

  const [messages,
    setMessages] =
    useState([]);

  const [input,
    setInput] =
    useState("");

  const messagesEndRef =
    useRef(null);

  const [loading,
    setLoading] =
    useState(false);

  const [position,
    setPosition] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "atsBotPosition"
        );

      return saved
        ? JSON.parse(saved)
        : {
            x:
              window.innerWidth - 120,
            y:
              window.innerHeight - 120
          };

    });

  const [dragging,
    setDragging] =
    useState(false);

  const [offset,
    setOffset] =
    useState({
      x: 0,
      y: 0
    });

  useEffect(() => {

    localStorage.setItem(

      "atsBotPosition",

      JSON.stringify(position)

    );

  }, [position]);

  const handleMouseDown =
    useCallback((e) => {

      setDragging(true);

      setOffset({

        x:
          e.clientX -
          position.x,

        y:
          e.clientY -
          position.y

      });

    }, [position]);

  const handleMouseMove =
    useCallback((e) => {

      if (!dragging)
        return;

      setPosition({

        x: Math.max(
          0,
          Math.min(
            window.innerWidth - 70,
            e.clientX - offset.x
          )
        ),

        y: Math.max(
          0,
          Math.min(
            window.innerHeight - 70,
            e.clientY - offset.y
          )
        )

      });

    }, [dragging, offset]);

  const handleMouseUp =
    useCallback(() => {

      setDragging(false);

    }, []);

  const handleQuickAction =
    useCallback(
      async (question) => {

        if (!token) {
          return;
        }

        setInput("");

        setMessages(
          prev => [
            ...prev,
            {
              sender: "user",
              text: question
            }
          ]
        );

        setLoading(true);

        try {

          const payload = {
            message: question
          };

          if (effectiveReportId) {
            payload.reportId =
              effectiveReportId;
          }

          const response =
            await api.post(

              "/chat",

              payload,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setMessages(
            prev => [
              ...prev,
              {
                sender: "bot",
                text:
                  response.data.reply
              }
            ]
          );

        } catch {

          setMessages(
            prev => [
              ...prev,
              {
                sender: "bot",
                text:
                  "Sorry, I am unable to respond right now."
              }
            ]
          );

        } finally {

          setLoading(false);

        }

      },
      [token, effectiveReportId]
    );

  const handleSend =
    useCallback(
      async () => {

        if (!token) {
          return;
        }

        if (
          !input.trim()
        )
          return;

        const userMessage =
          input;

        setMessages(
          prev => [
            ...prev,
            {
              sender:
                "user",
              text:
                userMessage
            }
          ]
        );

        setInput("");

        setLoading(true);

        try {

          const payload = {
            message:
              userMessage
          };

          if (effectiveReportId) {
            payload.reportId =
              effectiveReportId;
          }

          const response =
            await api.post(

              "/chat",

              payload,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setMessages(
            prev => [
              ...prev,
              {
                sender:
                  "bot",
                text:
                  response.data.reply
              }
            ]
          );

        } catch (error) {

          setMessages(
            prev => [
              ...prev,
              {
                sender:
                  "bot",
                text:
                  "Sorry, I am unable to respond right now."
              }
            ]
          );

        } finally {

          setLoading(false);

        }

      },
      [token, input, effectiveReportId]
    );

  useEffect(() => {

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseup",
      handleMouseUp
    );

    return () => {

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );

    };

  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {

    if (user && token) {

      const hasReport =
        localStorage.getItem(
          "latestReportId"
        );

      setMessages([
        {
          sender: "bot",

          text: hasReport

          ?

`Hi ${user.name} 👋

I can see you've analyzed a resume recently.

I can explain
```


## License: unknown
https://github.com/zesty-io/manager-ui/blob/8c6e959d8b994e1493693c95ac417968a8cf1514/src/shell/components/ResizeableContainer.tsx

```
```jsx
import {
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";

import api
from "../services/api";

import {
  useAuth
} from "../context/AuthContext";

import {
  FaRobot,
  FaTimes
} from "react-icons/fa";

function ATSAssistant({ reportId }) {

  const [isOpen,
    setIsOpen] =
    useState(false);

  const {
    token,
    user
  } = useAuth();

  const effectiveReportId =
    reportId ||
    (typeof window !== "undefined"
      ? localStorage.getItem("latestReportId")
      : null);

  const [messages,
    setMessages] =
    useState([]);

  const [input,
    setInput] =
    useState("");

  const messagesEndRef =
    useRef(null);

  const [loading,
    setLoading] =
    useState(false);

  const [position,
    setPosition] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "atsBotPosition"
        );

      return saved
        ? JSON.parse(saved)
        : {
            x:
              window.innerWidth - 120,
            y:
              window.innerHeight - 120
          };

    });

  const [dragging,
    setDragging] =
    useState(false);

  const [offset,
    setOffset] =
    useState({
      x: 0,
      y: 0
    });

  useEffect(() => {

    localStorage.setItem(

      "atsBotPosition",

      JSON.stringify(position)

    );

  }, [position]);

  const handleMouseDown =
    useCallback((e) => {

      setDragging(true);

      setOffset({

        x:
          e.clientX -
          position.x,

        y:
          e.clientY -
          position.y

      });

    }, [position]);

  const handleMouseMove =
    useCallback((e) => {

      if (!dragging)
        return;

      setPosition({

        x: Math.max(
          0,
          Math.min(
            window.innerWidth - 70,
            e.clientX - offset.x
          )
        ),

        y: Math.max(
          0,
          Math.min(
            window.innerHeight - 70,
            e.clientY - offset.y
          )
        )

      });

    }, [dragging, offset]);

  const handleMouseUp =
    useCallback(() => {

      setDragging(false);

    }, []);

  const handleQuickAction =
    useCallback(
      async (question) => {

        if (!token) {
          return;
        }

        setInput("");

        setMessages(
          prev => [
            ...prev,
            {
              sender: "user",
              text: question
            }
          ]
        );

        setLoading(true);

        try {

          const payload = {
            message: question
          };

          if (effectiveReportId) {
            payload.reportId =
              effectiveReportId;
          }

          const response =
            await api.post(

              "/chat",

              payload,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setMessages(
            prev => [
              ...prev,
              {
                sender: "bot",
                text:
                  response.data.reply
              }
            ]
          );

        } catch {

          setMessages(
            prev => [
              ...prev,
              {
                sender: "bot",
                text:
                  "Sorry, I am unable to respond right now."
              }
            ]
          );

        } finally {

          setLoading(false);

        }

      },
      [token, effectiveReportId]
    );

  const handleSend =
    useCallback(
      async () => {

        if (!token) {
          return;
        }

        if (
          !input.trim()
        )
          return;

        const userMessage =
          input;

        setMessages(
          prev => [
            ...prev,
            {
              sender:
                "user",
              text:
                userMessage
            }
          ]
        );

        setInput("");

        setLoading(true);

        try {

          const payload = {
            message:
              userMessage
          };

          if (effectiveReportId) {
            payload.reportId =
              effectiveReportId;
          }

          const response =
            await api.post(

              "/chat",

              payload,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setMessages(
            prev => [
              ...prev,
              {
                sender:
                  "bot",
                text:
                  response.data.reply
              }
            ]
          );

        } catch (error) {

          setMessages(
            prev => [
              ...prev,
              {
                sender:
                  "bot",
                text:
                  "Sorry, I am unable to respond right now."
              }
            ]
          );

        } finally {

          setLoading(false);

        }

      },
      [token, input, effectiveReportId]
    );

  useEffect(() => {

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseup",
      handleMouseUp
    );

    return () => {

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );

    };

  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {

    if (user && token) {

      const hasReport =
        localStorage.getItem(
          "latestReportId"
        );

      setMessages([
        {
          sender: "bot",

          text: hasReport

          ?

`Hi ${user.name} 👋

I can see you've analyzed a resume recently.

I can explain
```


## License: unknown
https://github.com/cenoroid/botoroid-react-app-viewer/blob/e184ee325446c4c8054609e4a3f5d54a5c9a190c/src/components/hooks/useGetBlockedArea.js

```
```jsx
import {
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";

import api
from "../services/api";

import {
  useAuth
} from "../context/AuthContext";

import {
  FaRobot,
  FaTimes
} from "react-icons/fa";

function ATSAssistant({ reportId }) {

  const [isOpen,
    setIsOpen] =
    useState(false);

  const {
    token,
    user
  } = useAuth();

  const effectiveReportId =
    reportId ||
    (typeof window !== "undefined"
      ? localStorage.getItem("latestReportId")
      : null);

  const [messages,
    setMessages] =
    useState([]);

  const [input,
    setInput] =
    useState("");

  const messagesEndRef =
    useRef(null);

  const [loading,
    setLoading] =
    useState(false);

  const [position,
    setPosition] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "atsBotPosition"
        );

      return saved
        ? JSON.parse(saved)
        : {
            x:
              window.innerWidth - 120,
            y:
              window.innerHeight - 120
          };

    });

  const [dragging,
    setDragging] =
    useState(false);

  const [offset,
    setOffset] =
    useState({
      x: 0,
      y: 0
    });

  useEffect(() => {

    localStorage.setItem(

      "atsBotPosition",

      JSON.stringify(position)

    );

  }, [position]);

  const handleMouseDown =
    useCallback((e) => {

      setDragging(true);

      setOffset({

        x:
          e.clientX -
          position.x,

        y:
          e.clientY -
          position.y

      });

    }, [position]);

  const handleMouseMove =
    useCallback((e) => {

      if (!dragging)
        return;

      setPosition({

        x: Math.max(
          0,
          Math.min(
            window.innerWidth - 70,
            e.clientX - offset.x
          )
        ),

        y: Math.max(
          0,
          Math.min(
            window.innerHeight - 70,
            e.clientY - offset.y
          )
        )

      });

    }, [dragging, offset]);

  const handleMouseUp =
    useCallback(() => {

      setDragging(false);

    }, []);

  const handleQuickAction =
    useCallback(
      async (question) => {

        if (!token) {
          return;
        }

        setInput("");

        setMessages(
          prev => [
            ...prev,
            {
              sender: "user",
              text: question
            }
          ]
        );

        setLoading(true);

        try {

          const payload = {
            message: question
          };

          if (effectiveReportId) {
            payload.reportId =
              effectiveReportId;
          }

          const response =
            await api.post(

              "/chat",

              payload,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setMessages(
            prev => [
              ...prev,
              {
                sender: "bot",
                text:
                  response.data.reply
              }
            ]
          );

        } catch {

          setMessages(
            prev => [
              ...prev,
              {
                sender: "bot",
                text:
                  "Sorry, I am unable to respond right now."
              }
            ]
          );

        } finally {

          setLoading(false);

        }

      },
      [token, effectiveReportId]
    );

  const handleSend =
    useCallback(
      async () => {

        if (!token) {
          return;
        }

        if (
          !input.trim()
        )
          return;

        const userMessage =
          input;

        setMessages(
          prev => [
            ...prev,
            {
              sender:
                "user",
              text:
                userMessage
            }
          ]
        );

        setInput("");

        setLoading(true);

        try {

          const payload = {
            message:
              userMessage
          };

          if (effectiveReportId) {
            payload.reportId =
              effectiveReportId;
          }

          const response =
            await api.post(

              "/chat",

              payload,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setMessages(
            prev => [
              ...prev,
              {
                sender:
                  "bot",
                text:
                  response.data.reply
              }
            ]
          );

        } catch (error) {

          setMessages(
            prev => [
              ...prev,
              {
                sender:
                  "bot",
                text:
                  "Sorry, I am unable to respond right now."
              }
            ]
          );

        } finally {

          setLoading(false);

        }

      },
      [token, input, effectiveReportId]
    );

  useEffect(() => {

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseup",
      handleMouseUp
    );

    return () => {

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );

    };

  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {

    if (user && token) {

      const hasReport =
        localStorage.getItem(
          "latestReportId"
        );

      setMessages([
        {
          sender: "bot",

          text: hasReport

          ?

`Hi ${user.name} 👋

I can see you've analyzed a resume recently.

I can explain
```


## License: unknown
https://github.com/zesty-io/manager-ui/blob/8c6e959d8b994e1493693c95ac417968a8cf1514/src/shell/components/ResizeableContainer.tsx

```
```jsx
import {
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";

import api
from "../services/api";

import {
  useAuth
} from "../context/AuthContext";

import {
  FaRobot,
  FaTimes
} from "react-icons/fa";

function ATSAssistant({ reportId }) {

  const [isOpen,
    setIsOpen] =
    useState(false);

  const {
    token,
    user
  } = useAuth();

  const effectiveReportId =
    reportId ||
    (typeof window !== "undefined"
      ? localStorage.getItem("latestReportId")
      : null);

  const [messages,
    setMessages] =
    useState([]);

  const [input,
    setInput] =
    useState("");

  const messagesEndRef =
    useRef(null);

  const [loading,
    setLoading] =
    useState(false);

  const [position,
    setPosition] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "atsBotPosition"
        );

      return saved
        ? JSON.parse(saved)
        : {
            x:
              window.innerWidth - 120,
            y:
              window.innerHeight - 120
          };

    });

  const [dragging,
    setDragging] =
    useState(false);

  const [offset,
    setOffset] =
    useState({
      x: 0,
      y: 0
    });

  useEffect(() => {

    localStorage.setItem(

      "atsBotPosition",

      JSON.stringify(position)

    );

  }, [position]);

  const handleMouseDown =
    useCallback((e) => {

      setDragging(true);

      setOffset({

        x:
          e.clientX -
          position.x,

        y:
          e.clientY -
          position.y

      });

    }, [position]);

  const handleMouseMove =
    useCallback((e) => {

      if (!dragging)
        return;

      setPosition({

        x: Math.max(
          0,
          Math.min(
            window.innerWidth - 70,
            e.clientX - offset.x
          )
        ),

        y: Math.max(
          0,
          Math.min(
            window.innerHeight - 70,
            e.clientY - offset.y
          )
        )

      });

    }, [dragging, offset]);

  const handleMouseUp =
    useCallback(() => {

      setDragging(false);

    }, []);

  const handleQuickAction =
    useCallback(
      async (question) => {

        if (!token) {
          return;
        }

        setInput("");

        setMessages(
          prev => [
            ...prev,
            {
              sender: "user",
              text: question
            }
          ]
        );

        setLoading(true);

        try {

          const payload = {
            message: question
          };

          if (effectiveReportId) {
            payload.reportId =
              effectiveReportId;
          }

          const response =
            await api.post(

              "/chat",

              payload,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setMessages(
            prev => [
              ...prev,
              {
                sender: "bot",
                text:
                  response.data.reply
              }
            ]
          );

        } catch {

          setMessages(
            prev => [
              ...prev,
              {
                sender: "bot",
                text:
                  "Sorry, I am unable to respond right now."
              }
            ]
          );

        } finally {

          setLoading(false);

        }

      },
      [token, effectiveReportId]
    );

  const handleSend =
    useCallback(
      async () => {

        if (!token) {
          return;
        }

        if (
          !input.trim()
        )
          return;

        const userMessage =
          input;

        setMessages(
          prev => [
            ...prev,
            {
              sender:
                "user",
              text:
                userMessage
            }
          ]
        );

        setInput("");

        setLoading(true);

        try {

          const payload = {
            message:
              userMessage
          };

          if (effectiveReportId) {
            payload.reportId =
              effectiveReportId;
          }

          const response =
            await api.post(

              "/chat",

              payload,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setMessages(
            prev => [
              ...prev,
              {
                sender:
                  "bot",
                text:
                  response.data.reply
              }
            ]
          );

        } catch (error) {

          setMessages(
            prev => [
              ...prev,
              {
                sender:
                  "bot",
                text:
                  "Sorry, I am unable to respond right now."
              }
            ]
          );

        } finally {

          setLoading(false);

        }

      },
      [token, input, effectiveReportId]
    );

  useEffect(() => {

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseup",
      handleMouseUp
    );

    return () => {

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );

    };

  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {

    if (user && token) {

      const hasReport =
        localStorage.getItem(
          "latestReportId"
        );

      setMessages([
        {
          sender: "bot",

          text: hasReport

          ?

`Hi ${user.name} 👋

I can see you've analyzed a resume recently.

I can explain
```


## License: unknown
https://github.com/cenoroid/botoroid-react-app-viewer/blob/e184ee325446c4c8054609e4a3f5d54a5c9a190c/src/components/hooks/useGetBlockedArea.js

```
```jsx
import {
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";

import api
from "../services/api";

import {
  useAuth
} from "../context/AuthContext";

import {
  FaRobot,
  FaTimes
} from "react-icons/fa";

function ATSAssistant({ reportId }) {

  const [isOpen,
    setIsOpen] =
    useState(false);

  const {
    token,
    user
  } = useAuth();

  const effectiveReportId =
    reportId ||
    (typeof window !== "undefined"
      ? localStorage.getItem("latestReportId")
      : null);

  const [messages,
    setMessages] =
    useState([]);

  const [input,
    setInput] =
    useState("");

  const messagesEndRef =
    useRef(null);

  const [loading,
    setLoading] =
    useState(false);

  const [position,
    setPosition] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "atsBotPosition"
        );

      return saved
        ? JSON.parse(saved)
        : {
            x:
              window.innerWidth - 120,
            y:
              window.innerHeight - 120
          };

    });

  const [dragging,
    setDragging] =
    useState(false);

  const [offset,
    setOffset] =
    useState({
      x: 0,
      y: 0
    });

  useEffect(() => {

    localStorage.setItem(

      "atsBotPosition",

      JSON.stringify(position)

    );

  }, [position]);

  const handleMouseDown =
    useCallback((e) => {

      setDragging(true);

      setOffset({

        x:
          e.clientX -
          position.x,

        y:
          e.clientY -
          position.y

      });

    }, [position]);

  const handleMouseMove =
    useCallback((e) => {

      if (!dragging)
        return;

      setPosition({

        x: Math.max(
          0,
          Math.min(
            window.innerWidth - 70,
            e.clientX - offset.x
          )
        ),

        y: Math.max(
          0,
          Math.min(
            window.innerHeight - 70,
            e.clientY - offset.y
          )
        )

      });

    }, [dragging, offset]);

  const handleMouseUp =
    useCallback(() => {

      setDragging(false);

    }, []);

  const handleQuickAction =
    useCallback(
      async (question) => {

        if (!token) {
          return;
        }

        setInput("");

        setMessages(
          prev => [
            ...prev,
            {
              sender: "user",
              text: question
            }
          ]
        );

        setLoading(true);

        try {

          const payload = {
            message: question
          };

          if (effectiveReportId) {
            payload.reportId =
              effectiveReportId;
          }

          const response =
            await api.post(

              "/chat",

              payload,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setMessages(
            prev => [
              ...prev,
              {
                sender: "bot",
                text:
                  response.data.reply
              }
            ]
          );

        } catch {

          setMessages(
            prev => [
              ...prev,
              {
                sender: "bot",
                text:
                  "Sorry, I am unable to respond right now."
              }
            ]
          );

        } finally {

          setLoading(false);

        }

      },
      [token, effectiveReportId]
    );

  const handleSend =
    useCallback(
      async () => {

        if (!token) {
          return;
        }

        if (
          !input.trim()
        )
          return;

        const userMessage =
          input;

        setMessages(
          prev => [
            ...prev,
            {
              sender:
                "user",
              text:
                userMessage
            }
          ]
        );

        setInput("");

        setLoading(true);

        try {

          const payload = {
            message:
              userMessage
          };

          if (effectiveReportId) {
            payload.reportId =
              effectiveReportId;
          }

          const response =
            await api.post(

              "/chat",

              payload,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setMessages(
            prev => [
              ...prev,
              {
                sender:
                  "bot",
                text:
                  response.data.reply
              }
            ]
          );

        } catch (error) {

          setMessages(
            prev => [
              ...prev,
              {
                sender:
                  "bot",
                text:
                  "Sorry, I am unable to respond right now."
              }
            ]
          );

        } finally {

          setLoading(false);

        }

      },
      [token, input, effectiveReportId]
    );

  useEffect(() => {

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseup",
      handleMouseUp
    );

    return () => {

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );

    };

  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {

    if (user && token) {

      const hasReport =
        localStorage.getItem(
          "latestReportId"
        );

      setMessages([
        {
          sender: "bot",

          text: hasReport

          ?

`Hi ${user.name} 👋

I can see you've analyzed a resume recently.

I can explain
```


## License: unknown
https://github.com/zesty-io/manager-ui/blob/8c6e959d8b994e1493693c95ac417968a8cf1514/src/shell/components/ResizeableContainer.tsx

```
```jsx
import {
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";

import api
from "../services/api";

import {
  useAuth
} from "../context/AuthContext";

import {
  FaRobot,
  FaTimes
} from "react-icons/fa";

function ATSAssistant({ reportId }) {

  const [isOpen,
    setIsOpen] =
    useState(false);

  const {
    token,
    user
  } = useAuth();

  const effectiveReportId =
    reportId ||
    (typeof window !== "undefined"
      ? localStorage.getItem("latestReportId")
      : null);

  const [messages,
    setMessages] =
    useState([]);

  const [input,
    setInput] =
    useState("");

  const messagesEndRef =
    useRef(null);

  const [loading,
    setLoading] =
    useState(false);

  const [position,
    setPosition] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "atsBotPosition"
        );

      return saved
        ? JSON.parse(saved)
        : {
            x:
              window.innerWidth - 120,
            y:
              window.innerHeight - 120
          };

    });

  const [dragging,
    setDragging] =
    useState(false);

  const [offset,
    setOffset] =
    useState({
      x: 0,
      y: 0
    });

  useEffect(() => {

    localStorage.setItem(

      "atsBotPosition",

      JSON.stringify(position)

    );

  }, [position]);

  const handleMouseDown =
    useCallback((e) => {

      setDragging(true);

      setOffset({

        x:
          e.clientX -
          position.x,

        y:
          e.clientY -
          position.y

      });

    }, [position]);

  const handleMouseMove =
    useCallback((e) => {

      if (!dragging)
        return;

      setPosition({

        x: Math.max(
          0,
          Math.min(
            window.innerWidth - 70,
            e.clientX - offset.x
          )
        ),

        y: Math.max(
          0,
          Math.min(
            window.innerHeight - 70,
            e.clientY - offset.y
          )
        )

      });

    }, [dragging, offset]);

  const handleMouseUp =
    useCallback(() => {

      setDragging(false);

    }, []);

  const handleQuickAction =
    useCallback(
      async (question) => {

        if (!token) {
          return;
        }

        setInput("");

        setMessages(
          prev => [
            ...prev,
            {
              sender: "user",
              text: question
            }
          ]
        );

        setLoading(true);

        try {

          const payload = {
            message: question
          };

          if (effectiveReportId) {
            payload.reportId =
              effectiveReportId;
          }

          const response =
            await api.post(

              "/chat",

              payload,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setMessages(
            prev => [
              ...prev,
              {
                sender: "bot",
                text:
                  response.data.reply
              }
            ]
          );

        } catch {

          setMessages(
            prev => [
              ...prev,
              {
                sender: "bot",
                text:
                  "Sorry, I am unable to respond right now."
              }
            ]
          );

        } finally {

          setLoading(false);

        }

      },
      [token, effectiveReportId]
    );

  const handleSend =
    useCallback(
      async () => {

        if (!token) {
          return;
        }

        if (
          !input.trim()
        )
          return;

        const userMessage =
          input;

        setMessages(
          prev => [
            ...prev,
            {
              sender:
                "user",
              text:
                userMessage
            }
          ]
        );

        setInput("");

        setLoading(true);

        try {

          const payload = {
            message:
              userMessage
          };

          if (effectiveReportId) {
            payload.reportId =
              effectiveReportId;
          }

          const response =
            await api.post(

              "/chat",

              payload,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setMessages(
            prev => [
              ...prev,
              {
                sender:
                  "bot",
                text:
                  response.data.reply
              }
            ]
          );

        } catch (error) {

          setMessages(
            prev => [
              ...prev,
              {
                sender:
                  "bot",
                text:
                  "Sorry, I am unable to respond right now."
              }
            ]
          );

        } finally {

          setLoading(false);

        }

      },
      [token, input, effectiveReportId]
    );

  useEffect(() => {

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseup",
      handleMouseUp
    );

    return () => {

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );

    };

  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {

    if (user && token) {

      const hasReport =
        localStorage.getItem(
          "latestReportId"
        );

      setMessages([
        {
          sender: "bot",

          text: hasReport

          ?

`Hi ${user.name} 👋

I can see you've analyzed a resume recently.

I can explain
```


## License: unknown
https://github.com/cenoroid/botoroid-react-app-viewer/blob/e184ee325446c4c8054609e4a3f5d54a5c9a190c/src/components/hooks/useGetBlockedArea.js

```
```jsx
import {
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";

import api
from "../services/api";

import {
  useAuth
} from "../context/AuthContext";

import {
  FaRobot,
  FaTimes
} from "react-icons/fa";

function ATSAssistant({ reportId }) {

  const [isOpen,
    setIsOpen] =
    useState(false);

  const {
    token,
    user
  } = useAuth();

  const effectiveReportId =
    reportId ||
    (typeof window !== "undefined"
      ? localStorage.getItem("latestReportId")
      : null);

  const [messages,
    setMessages] =
    useState([]);

  const [input,
    setInput] =
    useState("");

  const messagesEndRef =
    useRef(null);

  const [loading,
    setLoading] =
    useState(false);

  const [position,
    setPosition] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "atsBotPosition"
        );

      return saved
        ? JSON.parse(saved)
        : {
            x:
              window.innerWidth - 120,
            y:
              window.innerHeight - 120
          };

    });

  const [dragging,
    setDragging] =
    useState(false);

  const [offset,
    setOffset] =
    useState({
      x: 0,
      y: 0
    });

  useEffect(() => {

    localStorage.setItem(

      "atsBotPosition",

      JSON.stringify(position)

    );

  }, [position]);

  const handleMouseDown =
    useCallback((e) => {

      setDragging(true);

      setOffset({

        x:
          e.clientX -
          position.x,

        y:
          e.clientY -
          position.y

      });

    }, [position]);

  const handleMouseMove =
    useCallback((e) => {

      if (!dragging)
        return;

      setPosition({

        x: Math.max(
          0,
          Math.min(
            window.innerWidth - 70,
            e.clientX - offset.x
          )
        ),

        y: Math.max(
          0,
          Math.min(
            window.innerHeight - 70,
            e.clientY - offset.y
          )
        )

      });

    }, [dragging, offset]);

  const handleMouseUp =
    useCallback(() => {

      setDragging(false);

    }, []);

  const handleQuickAction =
    useCallback(
      async (question) => {

        if (!token) {
          return;
        }

        setInput("");

        setMessages(
          prev => [
            ...prev,
            {
              sender: "user",
              text: question
            }
          ]
        );

        setLoading(true);

        try {

          const payload = {
            message: question
          };

          if (effectiveReportId) {
            payload.reportId =
              effectiveReportId;
          }

          const response =
            await api.post(

              "/chat",

              payload,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setMessages(
            prev => [
              ...prev,
              {
                sender: "bot",
                text:
                  response.data.reply
              }
            ]
          );

        } catch {

          setMessages(
            prev => [
              ...prev,
              {
                sender: "bot",
                text:
                  "Sorry, I am unable to respond right now."
              }
            ]
          );

        } finally {

          setLoading(false);

        }

      },
      [token, effectiveReportId]
    );

  const handleSend =
    useCallback(
      async () => {

        if (!token) {
          return;
        }

        if (
          !input.trim()
        )
          return;

        const userMessage =
          input;

        setMessages(
          prev => [
            ...prev,
            {
              sender:
                "user",
              text:
                userMessage
            }
          ]
        );

        setInput("");

        setLoading(true);

        try {

          const payload = {
            message:
              userMessage
          };

          if (effectiveReportId) {
            payload.reportId =
              effectiveReportId;
          }

          const response =
            await api.post(

              "/chat",

              payload,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setMessages(
            prev => [
              ...prev,
              {
                sender:
                  "bot",
                text:
                  response.data.reply
              }
            ]
          );

        } catch (error) {

          setMessages(
            prev => [
              ...prev,
              {
                sender:
                  "bot",
                text:
                  "Sorry, I am unable to respond right now."
              }
            ]
          );

        } finally {

          setLoading(false);

        }

      },
      [token, input, effectiveReportId]
    );

  useEffect(() => {

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseup",
      handleMouseUp
    );

    return () => {

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );

    };

  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {

    if (user && token) {

      const hasReport =
        localStorage.getItem(
          "latestReportId"
        );

      setMessages([
        {
          sender: "bot",

          text: hasReport

          ?

`Hi ${user.name} 👋

I can see you've analyzed a resume recently.

I can explain
```

