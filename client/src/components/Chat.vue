<template>
  <div class="hello">
    <h1>{{ headingText }}</h1>
    <div class="chat">
      <div class="conversation-area">
        <ul class="messages">
          <li class="message" :class="{ self: message.self }" v-for="message in messages" :key="message.ID">
            <span class="author">
              <img v-if="message.AuthorIcon" :src="message.AuthorIcon"/>
              {{ message.AuthorName  }}
            </span>
            <span class="message-text">{{ message.Message }}</span>
            <span class="timestamp">{{ formatDate(message.DateAdded) }}</span>
          </li>
        </ul>
      </div>
      <form class="send-message" @submit.prevent="sendMessage">
        <input type="text" v-model="messageText"/>
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Chat',
    data() {
      return {
        headingText: 'Your conversation has started',
        messageText: '',
        messages: []
      };
    },
    methods: {
      async getMessages() {
        const response = await axios('http://localhost:8080/messages/101');
        response.data.map((item) => {
          this.messages.push(item);
        })
      },
      sendMessage() {
        if (!this.messageText) return;
        this.messages.push({
          Message: this.messageText,
          Id: Math.random(),
          AuthorName: 'You',
          DateAdded: Date.now(),
          self: true
        });
        this.messageText = '';
      },
      formatDate(date) {
        return Intl.DateTimeFormat(
          'en',
          {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
          }
        ).format(new Date(date))
      }
    },
    mounted() {
      this.getMessages();
    }
  };
</script>


<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .chat {
    border: 1px solid #ccc;
    max-width: 400px;
    margin: auto;
    height: 300px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
  }

  .conversation-area {
    overflow: scroll;
    padding: 10px;
    flex-grow: 1;
  }

  .messages {
    display: flex;
    flex-direction: column;
    align-items: end;
    margin: 0;
  }

  .message {
    margin: 5px 0;
    display: flex;
    flex-direction: column;
    align-items: self-end;
    text-align: right;
    max-width: 85%;
  }

  .message.self {
    align-self: flex-start;
    align-items: flex-start;
    text-align: left;
  }

  .message-text {
    background: dodgerblue;
    color: #fff;
    padding: 3px 7px;
    border-radius: 5px;
    display: block;
    margin-bottom: 3px;
  }

  .message.self .message-text {
    background: darkturquoise;
  }

  .timestamp {
    font-size: 10px;
  }

  .author {
    font-size: 13px;
  }

  .author img {
    width: 15px;
    vertical-align: -2px;
  }

  .send-message {
    padding: 15px;
    border-top: 1px solid #ccc;
  }
</style>
