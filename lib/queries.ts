const AUTH_LOGIN = (username: string, password: string): string => `
mutation {
    login(email:"${username}",password:"${password}"){
        message
        error
    }
}
`;

const REFRESH_TOKEN = () => `mutation {
  refreshToken {
   message
   error
  }
}`;

function AUTH_SIGNUP(data: {
  fname: string;
  lname: string;
  code: string;
  phone: string;
  email: string;
  password: string;
}) {
  return `
    mutation {
      signup(user: {
        fname: "${data.fname}"
        lname: "${data.lname}"
        code: "${data.code}"
        phone: "${data.phone}"
        email: "${data.email}"
        password: "${data.password}"
        role: "user"
      }) {
        id
        fname
        lname
        code
        phone
        email
        role
      }
    }
  `;
}

const CHAT_COMPLETIONS = (
  messages: Message[],
  filters: { id: number | undefined }
) => ({
  query: `
mutation {
  openAiCompletion(
    chatrequest: {
      messages: ${JSON.stringify(messages)
        .replace(/"/g, "")
        .replace(/#/g, '"')},
      filters: ${JSON.stringify(filters).replace(/"/g, "").replace(/#/g, '"')}
    }
  ) {
    role
    content
  }
}
`,
});

const LIST_AGENTS = (
  page: number = 0,
  search: string | undefined = undefined,
  orderBy: string | undefined = undefined
) => ({
  query: `
query {
  listAgentsBeta(
    request: {
      ${page !== undefined ? `page: ${page},` : ""}
      ${search ? `s: "${search}",` : ""}
      ${orderBy ? `orderBy: "${orderBy}",` : ""}
    }
  ) {
    items {
      id
      agentName
      description
      system
      createdDate
    }
    hasMore
    page
  }
}`,
});

const AGENT_BY_ID = (id: number) => ({
  query: `
query {
  agentById(
    request: {
      id : ${id}
    }
  ) {
    id
    agentName
    description
    system
    createdDate
    responseTemplate
    trainingPrompts
    createdDate
    updatedDate  
  }
}`,
});

export {
  AUTH_LOGIN,
  REFRESH_TOKEN,
  AUTH_SIGNUP,
  CHAT_COMPLETIONS,
  LIST_AGENTS,
  AGENT_BY_ID,
};
