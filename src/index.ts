import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from 'zod';
import { ExpressHttpStreamableMcpServer } from "./server_runner.js";
import axios from "axios";

console.log("Initializing MCP Streamable-HTTP Server with Express")

const servers = ExpressHttpStreamableMcpServer(
  {
    name: "irrah-mcp-server",
  },
  server => {
    server.tool(
      'consulta-cotacao',
      'Realiza uma consulta de cotação de uma moeda em tempo real.',
      {
        sigla: z.string().describe('Sigla da moeda a ser consultada, Ex: USD, EUR, BTC.')
      },
      async ({ sigla }, { authInfo }): Promise<CallToolResult> => {
        // console.log('authInfo:', authInfo);

        const response = await axios.get(`https://economia.awesomeapi.com.br/json/last/${sigla}`)
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(response.data),
            },
          ],
        };
      }
    );
  })
