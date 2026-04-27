/**
 * viagens.js - Banco de Dados e Renderização Dinâmica
 * Projeto: Volta Express Brasil - Persona: Embarcador (Quero Transportar)
 */

// 1. Banco de Dados de Viagens (22 itens)
const viagensDisponiveis = [
  {
    id: 1,
    nome: "Caminhão do João",
    origem: "São Paulo - SP",
    destino: "Campinas - SP",
    valor: "120",
    data: "10/07",
    peso: "1.200kg",
    capacidade: "1.5T",
    volume: "6m³",
    categoria: "Vans",
    descricao: "Ideal para entregas rápidas e percursos urbanos.",
    imagem: "./assets/embarcador/buscar-caminhao/caminhao-azul-1.jpg",
    whatsapp: "5532998615190",
  },
  {
    id: 2,
    nome: "Caminhão da Ana",
    origem: "Belo Horizonte - MG",
    destino: "Rio de Janeiro - RJ",
    valor: "280",
    data: "12/07",
    peso: "10.000kg",
    capacidade: "14T",
    volume: "40m³",
    categoria: "Truck",
    descricao: "Rota frequente, garantia de agilidade e segurança.",
    imagem:
      "./assets/embarcador/buscar-caminhao/caminhao-frota-frigorifico-2.jpg",
    whatsapp: "5532998615190",
  },
  {
    id: 3,
    nome: "Transportes Sul",
    origem: "Curitiba - PR",
    destino: "Porto Alegre - RS",
    valor: "350",
    data: "11/07",
    peso: "24.000kg",
    capacidade: "26T",
    volume: "90m³",
    categoria: "Carreta Sider",
    descricao: "Grande capacidade de volume e carga protegida.",
    imagem: "./assets/embarcador/buscar-caminhao/caminhao-laranja-3.jpg",
    whatsapp: "5532998615190",
  },
  {
    id: 4,
    nome: "Rápido Fretes",
    origem: "Salvador - BA",
    destino: "Recife - PE",
    valor: "200",
    data: "13/07",
    peso: "5.500kg",
    capacidade: "6T",
    volume: "25m³",
    categoria: "Toco",
    descricao: "Especialista em logística regional e carga seca.",
    imagem: "./assets/embarcador/buscar-caminhao/caminhao-frota-4.jpg",
    whatsapp: "5532998615190",
  },
  {
    id: 5,
    nome: "Expedição Brasil",
    origem: "Cuiabá - MT",
    destino: "Santos - SP",
    valor: "450",
    data: "15/07",
    peso: "28.000kg",
    capacidade: "30T",
    volume: "120m³",
    categoria: "Bitrem",
    descricao: "Longas distâncias com máxima capacidade.",
    imagem: "./assets/embarcador/buscar-caminhao/caminhao-preto-5.jpg",
    whatsapp: "5532998615190",
  },
  {
    id: 6,
    nome: "Caminhão do Beto",
    origem: "Ribeirão Preto - SP",
    destino: "São Paulo - SP",
    valor: "130",
    data: "10/07",
    peso: "2.800kg",
    capacidade: "3T",
    volume: "15m³",
    categoria: "3/4",
    descricao: "Retorno programado com custo reduzido.",
    imagem: "./assets/embarcador/buscar-caminhao/caminhao-azul-6.png",
    whatsapp: "5532998615190",
  },
  {
    id: 7,
    nome: "Logística Segura",
    origem: "Juiz de Fora - MG",
    destino: "Vitória - ES",
    valor: "300",
    data: "14/07",
    peso: "9.000kg",
    capacidade: "10T",
    volume: "30m³",
    categoria: "Refrigerado",
    descricao: "Ideal para alimentos e cargas sensíveis.",
    imagem: "./assets/embarcador/buscar-caminhao/caminhao-amarelo-8.jpg",
    whatsapp: "5532998615190",
  },
  {
    id: 8,
    nome: "Frete Expresso",
    origem: "Campinas - SP",
    destino: "Belo Horizonte - MG",
    valor: "190",
    data: "16/07",
    peso: "3.500kg",
    capacidade: "4T",
    volume: "18m³",
    categoria: "VUC",
    descricao: "Acesso livre em zonas urbanas restritas.",
    imagem: "./assets/embarcador/buscar-caminhao/caminhao-azul-1.jpg",
    whatsapp: "5532998615190",
  },
  {
    id: 9,
    nome: "Norte Transportes",
    origem: "Belém - PA",
    destino: "Manaus - AM",
    valor: "550",
    data: "18/07",
    peso: "12.000kg",
    capacidade: "15T",
    volume: "50m³",
    categoria: "Truck Baú",
    descricao: "Transporte fluvial e rodoviário integrado.",
    imagem:
      "./assets/embarcador/buscar-caminhao/caminhao-frota-frigorifico-2.jpg",
    whatsapp: "5532998615190",
  },
  {
    id: 10,
    nome: "Caminhão do Ricardo",
    origem: "Goiânia - GO",
    destino: "Brasília - DF",
    valor: "150",
    data: "11/07",
    peso: "4.000kg",
    capacidade: "5T",
    volume: "20m³",
    categoria: "Toco",
    descricao: "Agilidade no eixo central do país.",
    imagem: "./assets/embarcador/buscar-caminhao/caminhao-laranja-3.jpg",
    whatsapp: "5532998615190",
  },
  {
    id: 11,
    nome: "Sudeste Log",
    origem: "Rio de Janeiro - RJ",
    destino: "Vitória - ES",
    valor: "220",
    data: "19/07",
    peso: "8.500kg",
    capacidade: "10T",
    volume: "35m³",
    categoria: "Truck",
    descricao: "Atendimento diário no litoral sudeste.",
    imagem: "./assets/embarcador/buscar-caminhao/caminhao-frota-4.jpg",
    whatsapp: "5532998615190",
  },
  {
    id: 12,
    nome: "Grãos do Oeste",
    origem: "Rondonópolis - MT",
    destino: "Paranaguá - PR",
    valor: "600",
    data: "22/07",
    peso: "35.000kg",
    capacidade: "37T",
    volume: "100m³",
    categoria: "Granelero",
    descricao: "Especialista em escoamento de safra.",
    imagem: "./assets/embarcador/buscar-caminhao/caminhao-preto-5.jpg",
    whatsapp: "5532998615190",
  },
  {
    id: 13,
    nome: "Caminhão do Bruno",
    origem: "Florianópolis - SC",
    destino: "Curitiba - PR",
    valor: "180",
    data: "13/07",
    peso: "2.500kg",
    capacidade: "3.5T",
    volume: "12m³",
    categoria: "3/4",
    descricao: "Transporte fracionado com segurança.",
    imagem: "./assets/embarcador/buscar-caminhao/caminhao-azul-6.png",
    whatsapp: "5532998615190",
  },
  {
    id: 14,
    nome: "Expressinho Maranhão",
    origem: "São Luís - MA",
    destino: "Teresina - PI",
    valor: "210",
    data: "14/07",
    peso: "5.000kg",
    capacidade: "7T",
    volume: "22m³",
    categoria: "Toco",
    descricao: "Conexão rápida entre capitais do nordeste.",
    imagem: "./assets/embarcador/buscar-caminhao/caminhao-amarelo-8.jpg",
    whatsapp: "5532998615190",
  },
  {
    id: 15,
    nome: "Pampa Cargas",
    origem: "Uruguaiana - RS",
    destino: "São Paulo - SP",
    valor: "480",
    data: "25/07",
    peso: "22.000kg",
    capacidade: "25T",
    volume: "85m³",
    categoria: "Carreta",
    descricao: "Transporte interestadual de longa distância.",
    imagem: "./assets/embarcador/buscar-caminhao/caminhao-azul-1.jpg",
    whatsapp: "5532998615190",
  },
  {
    id: 16,
    nome: "Caminhão do Wagner",
    origem: "Campo Grande - MS",
    destino: "Dourados - MS",
    valor: "140",
    data: "10/07",
    peso: "3.000kg",
    capacidade: "4T",
    volume: "16m³",
    categoria: "VUC",
    descricao: "Distribuição regional eficiente.",
    imagem:
      "./assets/embarcador/buscar-caminhao/caminhao-frota-frigorifico-2.jpg",
    whatsapp: "5532998615190",
  },
  {
    id: 17,
    nome: "Nordeste Sider",
    origem: "Fortaleza - CE",
    destino: "Natal - RN",
    valor: "260",
    data: "17/07",
    peso: "14.000kg",
    capacidade: "16T",
    volume: "45m³",
    categoria: "Truck Sider",
    descricao: "Ideal para paletizados e carga seca.",
    imagem: "./assets/embarcador/buscar-caminhao/caminhao-laranja-3.jpg",
    whatsapp: "5532998615190",
  },
  {
    id: 18,
    nome: "Mineiro Express",
    origem: "Uberlândia - MG",
    destino: "Ribeirão Preto - SP",
    valor: "175",
    data: "12/07",
    peso: "6.000kg",
    capacidade: "8T",
    volume: "28m³",
    categoria: "Toco",
    descricao: "Conexão rápida no Triângulo Mineiro.",
    imagem: "./assets/embarcador/buscar-caminhao/caminhao-frota-4.jpg",
    whatsapp: "5532998615190",
  },
  {
    id: 19,
    nome: "Caminhão do Paulo",
    origem: "Maceió - AL",
    destino: "Aracaju - SE",
    valor: "195",
    data: "15/07",
    peso: "4.500kg",
    capacidade: "6T",
    volume: "24m³",
    categoria: "VUC",
    descricao: "Entregas pontuais no litoral nordestino.",
    imagem: "./assets/embarcador/buscar-caminhao/caminhao-preto-5.jpg",
    whatsapp: "5532998615190",
  },
  {
    id: 20,
    nome: "Brasil Central",
    origem: "Palmas - TO",
    destino: "Goiânia - GO",
    valor: "320",
    data: "20/07",
    peso: "18.000kg",
    capacidade: "20T",
    volume: "70m³",
    categoria: "Truck",
    descricao: "Rota consolidada no coração do Brasil.",
    imagem: "./assets/embarcador/buscar-caminhao/caminhao-azul-6.png",
    whatsapp: "5532998615190",
  },
  {
    id: 21,
    nome: "Caminhão do Zé",
    origem: "João Pessoa - PB",
    destino: "Recife - PE",
    valor: "110",
    data: "09/07",
    peso: "2.000kg",
    capacidade: "2.5T",
    volume: "10m³",
    categoria: "Vans",
    descricao: "Fretes curtos e urgentes.",
    imagem: "./assets/embarcador/buscar-caminhao/caminhao-amarelo-8.jpg",
    whatsapp: "5532998615190",
  },
  {
    id: 22,
    nome: "Carga Pesada Sul",
    origem: "Joinville - SC",
    destino: "Santos - SP",
    valor: "380",
    data: "24/07",
    peso: "30.000kg",
    capacidade: "32T",
    volume: "110m³",
    categoria: "Bitrem Sider",
    descricao: "Logística industrial de alta performance.",
    imagem: "./assets/embarcador/buscar-caminhao/caminhao-azul-1.jpg",
    whatsapp: "5532998615190",
  },
];

let viagensExibidas = 0;
const viagensPorVez = 6;
const incremento = 4;

function renderizarCards(lista) {
  const container = document.getElementById("services-content");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const msgFinal = document.getElementById("all-loaded-msg");

  const fragmento = document.createDocumentFragment();
  const limite = Math.min(
    viagensExibidas + (viagensExibidas === 0 ? viagensPorVez : incremento),
    lista.length,
  );

  for (let i = viagensExibidas; i < limite; i++) {
    const viagem = lista[i];
    const card = document.createElement("div");
    card.className = "box";
    card.innerHTML = `
            <div class="box-img">
                <img src="${viagem.imagem}" alt="${viagem.nome}">
                <span class="type-badge">${viagem.categoria}</span>
            </div>
            <div class="content">
                <div class="card-header">
                    <h3>${viagem.nome}</h3>
                    <a href="javascript:void(0)" onclick="abrirModal(${viagem.id})" class="trajeto-link">
                        <i class='bx bx-map-alt'></i> Ver Trajeto
                    </a>
                </div>
                <div class="route-info">
                    <div class="route-item">
                        <i class='bx bxs-circle' style="color: var(--main-color); font-size: 8px;"></i>
                        <span><strong>De:</strong> ${viagem.origem}</span>
                    </div>
                    <div class="route-line"></div>
                    <div class="route-item">
                        <i class='bx bxs-map' style="color: var(--dark-color); font-size: 12px;"></i>
                        <span><strong>Para:</strong> ${viagem.destino}</span>
                    </div>
                </div>
                <div class="card-specs">
                    <div class="spec"><i class='bx bx-calendar'></i> <span>${viagem.data}</span></div>
                    <div class="spec"><i class='bx bx-weight'></i> <span>${viagem.capacidade}</span></div>
                    <div class="spec"><i class='bx bx-package'></i> <span>${viagem.volume}</span></div>
                    <div class="spec"><i class='bx bx-check-shield'></i> <span>Verificado</span></div>
                </div>
                <p class="description">${viagem.descricao}</p>
                <a href="https://wa.me/${viagem.whatsapp}" target="_blank" class="btn-whatsapp">
                    Transportar Agora <i class='bx bxl-whatsapp'></i>
                </a>
            </div>
        `;
    fragmento.appendChild(card);
  }

  container.appendChild(fragmento);
  viagensExibidas = limite;

  // Controle de visibilidade do botão
  if (viagensExibidas >= lista.length) {
    loadMoreBtn.style.display = "none";
    msgFinal.style.display = "block";
  } else {
    loadMoreBtn.style.display = "inline-block";
    msgFinal.style.display = "none";
  }
}
