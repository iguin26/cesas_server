import React from "react";
import { Box, H1, Text, H2, Icon } from "@adminjs/design-system";

const HomePage = () => {
  return (
    <Box variant="grey" flexGrow={1} p="lg">
      <Box display="flex" justifyContent="center" mb="xl">
        <img
          src="/uploads/logo/logo-cesas.png"
          alt="Logo CESAS"
          style={{ maxWidth: "300px", height: "auto" }}
        />
      </Box>
      <H1 textAlign="center">Bem-vindo ao Painel Administrativo CESAS!</H1>
      <Text mt="xl" textAlign="justify">
        Este é o seu painel de administração personalizado. Utilize o menu
        lateral para navegar entre as diferentes seções e gerenciar o conteúdo
        do site CESAS.
      </Text>

      <H2 mt="xxl" mb="lg">
        Gerenciamento de Conteúdo do Site:
      </H2>
      <Text mt="lg" mb="md">
        Para atualizar as informações e mídias do site público, siga as
        instruções abaixo. Geralmente, para editar um item, você pode clicar nos
        três pontinhos (<Icon icon="MoreVertical" />) ao lado do item na lista e
        selecionar "Editar".
      </Text>
      <ul style={{ paddingLeft: "20px", listStylePosition: "outside" }}>
        <li>
          <Text
            my="md"
            fontSize="lg"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            mb="sm"
          >
            <Icon icon="Edit" mr="sm" /> Página Principal:
          </Text>
          <Text ml="24px">
            Para modificar a imagem de destaque e o texto introdutório da página
            inicial do site, navegue até a seção "Página Principal" no menu
            lateral. Não é possível criar novos itens ou deletar o item
            existente aqui.
          </Text>
        </li>
        <Box my="lg" />
        <li>
          <Text
            my="md"
            fontSize="lg"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            mb="sm"
          >
            <Icon icon="Copy" mr="sm" /> Cards da Página Principal:
          </Text>
          <Box ml="24px">
            <Text mb="sm">
              {" "}
              Os blocos de informação (cards) exibidos na página inicial podem
              ser editados na seção "Cards Página Principal".
            </Text>
            <ul
              style={{
                paddingLeft: "20px",
                listStylePosition: "outside",
                marginTop: "0px",
              }}
            >
              {" "}
              <li style={{ marginBottom: "8px" }}>
                Para controlar a <strong>visibilidade</strong> de um card no
                site (por exemplo, se desejar exibir apenas 2 dos 4 cards),
                localize o card desejado na lista, clique para editar e
                desmarque a caixa de seleção "Mostrar". Para exibi-lo novamente,
                basta marcar essa caixa.
              </li>
            </ul>
          </Box>
        </li>
        <Box my="lg" />
        <li>
          <Text
            my="md"
            fontSize="lg"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            mb="sm"
          >
            <Icon icon="Book" mr="sm" /> Cursos:
          </Text>
          <Box ml="24px">
            <Text mb="sm">
              Para adicionar novos cursos, acesse a seção "Cursos" e clique em
              "Criar novo". Para modificar um curso existente, encontre-o na
              lista, clique sobre ele ou nos três pontinhos ao lado, e selecione
              "Editar".
            </Text>
            <ul
              style={{
                paddingLeft: "20px",
                listStylePosition: "outside",
                marginTop: "0px",
              }}
            >
              <li style={{ marginBottom: "8px" }}>
                Assim como nos cards, cada curso possui uma caixa de seleção
                "Mostrar". Se desejar ocultar temporariamente um curso do site
                sem excluí-lo, basta desmarcar esta opção ao editar o curso.
                Para reexibi-lo, marque a caixa novamente.
              </li>
            </ul>
          </Box>
        </li>
        <Box my="lg" />
        <li>
          <Text
            my="md"
            fontSize="lg"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            mb="sm"
          >
            <Icon icon="Help" mr="sm" /> Perguntas e Respostas (FAQ):
          </Text>
          <Box ml="24px">
            <Text mb="sm">
              Gerencie as perguntas frequentes e suas respectivas respostas na
              seção "Perguntas e Respostas". Para criar uma nova, clique em
              "Criar novo". Para editar uma existente, localize-a, clique sobre
              ela ou nos três pontinhos, e escolha "Editar".
            </Text>
            <ul
              style={{
                paddingLeft: "20px",
                listStylePosition: "outside",
                marginTop: "0px",
              }}
            >
              <li style={{ marginBottom: "8px" }}>
                Cada pergunta também possui a opção "Mostrar". Utilize esta
                caixa de seleção para controlar quais perguntas e respostas
                aparecem na seção de FAQ do site.
              </li>
            </ul>
          </Box>
        </li>
        <Box my="lg" />
        <li>
          <Text
            my="md"
            fontSize="lg"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            mb="sm"
          >
            <Icon icon="Link" mr="sm" /> Rodapé:
          </Text>
          <Text ml="24px">
            Os links para redes sociais e informações de contato no rodapé são
            gerenciados na seção "Rodapé". Clique nos três pontinhos ao lado e
            selecione "Editar" para atualizar essas informações. Não é possível
            nem criar um novo item nem excluir o já existente.
          </Text>
        </li>
      </ul>

      <Text mt="xl" fontStyle="italic">
        <Icon icon="Image" mr="sm" />
        Dica: Nas listagens de recursos que exibem imagens (como Cursos), a
        imagem geralmente é uma miniatura. Clicar sobre ela ampliará a imagem
        para melhor visualização.
      </Text>

      <H2 mt="xxl" mb="lg">
        Gerenciamento de Alunos:
      </H2>
      <Text mt="lg" mb="md">
        Este painel também facilita a gestão de informações e documentos dos
        alunos. Os registros de estudantes são principalmente para visualização
        e exportação de dados através deste painel.
      </Text>
      <ul style={{ paddingLeft: "20px", listStylePosition: "outside" }}>
        <li>
          <Text
            my="md"
            fontSize="lg"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            mb="sm"
          >
            <Icon icon="User" mr="sm" /> Alunos (EJA e Profissionalizante):
          </Text>
          <Text ml="24px">
            Na seção "Estudantes", você pode visualizar a lista de todos os
            alunos. Clicar em um aluno abrirá seus detalhes para visualização.
          </Text>
        </li>
        <Box my="lg" />
        <li>
          <Text
            my="md"
            fontSize="lg"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            mb="sm"
          >
            <Icon icon="Download" mr="sm" /> Download de Fichas (PDF - Alunos
            EJA):
          </Text>
          <Box ml="24px">
            <ul
              style={{
                paddingLeft: "20px",
                listStylePosition: "outside",
                marginTop: "0px",
              }}
            >
              <li style={{ marginBottom: "8px" }}>
                Para baixar a ficha em PDF de um{" "}
                <strong>aluno específico</strong>, encontre o aluno na lista de
                "Alunos EJA", clique nos <strong>três pontinhos</strong> (
                <Icon icon="MoreVertical" />) ao lado do aluno e selecione a
                ação "Baixar PDF(s) (Individual)".
              </li>
              <li style={{ marginBottom: "8px" }}>
                Para baixar um arquivo ZIP contendo as fichas de{" "}
                <strong>todos os alunos EJA</strong>, acesse a listagem de
                "Alunos EJA" e procure pela ação "Baixar PDF(s) (Todos)"
                disponível no <strong>canto superior direito</strong> da tela,
                próximo ao botão "Criar novo".
              </li>
              <li style={{ marginBottom: "8px" }}>
                Para baixar um arquivo ZIP com as fichas de{" "}
                <strong>alunos EJA selecionados</strong>, marque a caixa de
                seleção ao lado dos alunos desejados na lista (ou use o filtro
                para refinar a lista e depois marque a caixa de seleção
                principal para selecionar todos os filtrados) e então clique na
                ação "Baixar PDF(s) (Selecionados)" que aparecerá no topo da
                lista.
              </li>
            </ul>
          </Box>
        </li>
        <Box my="lg" />
        <li>
          <Text
            my="md"
            fontSize="lg"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            mb="sm"
          >
            <Icon icon="Download" mr="sm" /> Download de Dados (CSV - Alunos
            Profissionalizante):
          </Text>
          <Box ml="24px">
            <ul
              style={{
                paddingLeft: "20px",
                listStylePosition: "outside",
                marginTop: "0px",
              }}
            >
              <li style={{ marginBottom: "8px" }}>
                Para baixar os dados em CSV de um{" "}
                <strong>aluno profissionalizante específico</strong>, encontre o
                aluno na lista de "Alunos Profissionalizante", clique nos{" "}
                <strong>três pontinhos</strong> (<Icon icon="MoreVertical" />)
                ao lado do aluno e selecione a ação "Baixar CSV(s)
                (Individual)".
              </li>
              <li style={{ marginBottom: "8px" }}>
                Para baixar um arquivo ZIP contendo os CSVs de{" "}
                <strong>todos os alunos profissionalizante</strong>, acesse a
                listagem de "Alunos Profissionalizante" e procure pela ação
                "Baixar Csv(s) (Todos)" disponível no{" "}
                <strong>canto superior direito</strong> da tela, próximo ao
                botão "Criar novo".
              </li>
              <li style={{ marginBottom: "8px" }}>
                Para baixar um arquivo ZIP com os CSVs de{" "}
                <strong>alunos profissionalizante selecionados</strong>, marque
                a caixa de seleção ao lado dos alunos desejados na lista (ou use
                o filtro para refinar a lista e depois marque a caixa de seleção
                principal para selecionar todos os filtrados) e então clique na
                ação "Baixar Csv(s) (Selecionados)" que aparecerá no topo da
                lista.
              </li>
            </ul>
          </Box>
        </li>
      </ul>

      <Text mt="xxl" fontStyle="italic">
        Dica: Utilize os filtros disponíveis no topo das listas para encontrar
        rapidamente os registros que deseja gerenciar.
      </Text>
    </Box>
  );
};

export default HomePage;
