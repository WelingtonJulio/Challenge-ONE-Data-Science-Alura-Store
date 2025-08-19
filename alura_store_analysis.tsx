import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Store, TrendingDown, TrendingUp, AlertTriangle, CheckCircle, DollarSign, Star, Package, Truck } from 'lucide-react';

const AluraStoreAnalysis = () => {
  const [selectedLoja, setSelectedLoja] = useState('all');
  const [currentAnalysis, setCurrentAnalysis] = useState(0);
  
  // Dados simulados das 4 lojas
  const lojas = {
    'Loja A': {
      id: 'A',
      faturamento: 450000,
      avaliacaoMedia: 4.2,
      totalVendas: 2850,
      fretemedio: 15.50,
      categoriasTop: [
        { nome: 'Eletrônicos', vendas: 1200, percentual: 42.1 },
        { nome: 'Casa & Jardim', vendas: 800, percentual: 28.1 },
        { nome: 'Roupas', vendas: 550, percentual: 19.3 },
        { nome: 'Livros', vendas: 300, percentual: 10.5 }
      ],
      produtosTop: [
        { nome: 'Smartphone XYZ', vendas: 180, receita: 45000 },
        { nome: 'Notebook ABC', vendas: 95, receita: 38000 },
        { nome: 'Fone Bluetooth', vendas: 320, receita: 25600 },
        { nome: 'Smart TV 50"', vendas: 65, receita: 32500 }
      ],
      performance: {
        crescimento: -2.3,
        satisfacao: 3.8,
        eficiencia: 68
      }
    },
    'Loja B': {
      id: 'B',
      faturamento: 680000,
      avaliacaoMedia: 4.7,
      totalVendas: 3420,
      fretemedicio: 12.80,
      categoriasTop: [
        { nome: 'Eletrônicos', vendas: 1580, percentual: 46.2 },
        { nome: 'Casa & Jardim', vendas: 950, percentual: 27.8 },
        { nome: 'Roupas', vendas: 620, percentual: 18.1 },
        { nome: 'Livros', vendas: 270, percentual: 7.9 }
      ],
      produtosTop: [
        { nome: 'iPhone 15', vendas: 220, receita: 88000 },
        { nome: 'MacBook Pro', vendas: 85, receita: 51000 },
        { nome: 'AirPods Pro', vendas: 410, receita: 45100 },
        { nome: 'iPad Air', vendas: 125, receita: 37500 }
      ],
      performance: {
        crescimento: 8.5,
        satisfacao: 4.6,
        eficiencia: 89
      }
    },
    'Loja C': {
      id: 'C',
      faturamento: 320000,
      avaliacaoMedia: 3.9,
      totalVendas: 2100,
      fretemedicio: 18.20,
      categoriasTop: [
        { nome: 'Roupas', vendas: 840, percentual: 40.0 },
        { nome: 'Casa & Jardim', vendas: 630, percentual: 30.0 },
        { nome: 'Eletrônicos', vendas: 420, percentual: 20.0 },
        { nome: 'Livros', vendas: 210, percentual: 10.0 }
      ],
      produtosTop: [
        { nome: 'Camiseta Polo', vendas: 180, receita: 9000 },
        { nome: 'Jaqueta Jeans', vendas: 95, receita: 9500 },
        { nome: 'Tênis Esportivo', vendas: 120, receita: 12000 },
        { nome: 'Relógio Digital', vendas: 65, receita: 6500 }
      ],
      performance: {
        crescimento: -5.7,
        satisfacao: 3.2,
        eficiencia: 45
      }
    },
    'Loja D': {
      id: 'D',
      faturamento: 590000,
      avaliacaoMedia: 4.5,
      totalVendas: 3180,
      fretemedicio: 14.30,
      categoriasTop: [
        { nome: 'Casa & Jardim', vendas: 1270, percentual: 39.9 },
        { nome: 'Eletrônicos', vendas: 1080, percentual: 34.0 },
        { nome: 'Roupas', vendas: 640, percentual: 20.1 },
        { nome: 'Livros', vendas: 190, percentual: 6.0 }
      ],
      produtosTop: [
        { nome: 'Aspirador Robô', vendas: 150, receita: 45000 },
        { nome: 'Cafeteira Express', vendas: 280, receita: 42000 },
        { nome: 'Smart TV 65"', vendas: 95, receita: 57000 },
        { nome: 'Console Game', vendas: 110, receita: 44000 }
      ],
      performance: {
        crescimento: 4.2,
        satisfacao: 4.3,
        eficiencia: 82
      }
    }
  };
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  // Dados para comparação geral
  const faturamentoComparacao = Object.entries(lojas).map(([nome, dados]) => ({
    loja: nome,
    faturamento: dados.faturamento,
    vendas: dados.totalVendas,
    avaliacao: dados.avaliacaoMedia,
    eficiencia: dados.performance.eficiencia
  }));
  
  const analises = [
    {
      titulo: "Faturamento e Volume de Vendas",
      icone: <DollarSign className="w-6 h-6" />,
      conteudo: () => (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 border rounded-lg">
              <h3 className="font-semibold mb-3 text-center">Faturamento por Loja (R$)</h3>
              <BarChart width={300} height={250} data={faturamentoComparacao}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="loja" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
                <Bar dataKey="faturamento" fill="#3b82f6" />
              </BarChart>
            </div>
            
            <div className="bg-white p-4 border rounded-lg">
              <h3 className="font-semibold mb-3 text-center">Volume de Vendas</h3>
              <BarChart width={300} height={250} data={faturamentoComparacao}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="loja" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="vendas" fill="#10b981" />
              </BarChart>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(lojas).map(([nome, dados]) => (
              <div key={nome} className="bg-blue-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-blue-800">{nome}</h4>
                <p className="text-2xl font-bold text-blue-600">
                  R$ {(dados.faturamento / 1000).toFixed(0)}k
                </p>
                <p className="text-sm text-blue-700">{dados.totalVendas} vendas</p>
                <p className="text-xs text-blue-600">
                  R$ {(dados.faturamento / dados.totalVendas).toFixed(0)} por venda
                </p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      titulo: "Avaliações e Satisfação dos Clientes",
      icone: <Star className="w-6 h-6" />,
      conteudo: () => (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 border rounded-lg">
              <h3 className="font-semibold mb-3 text-center">Avaliação Média por Loja</h3>
              <BarChart width={300} height={250} data={faturamentoComparacao}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="loja" />
                <YAxis domain={[0, 5]} />
                <Tooltip formatter={(value) => `${value} estrelas`} />
                <Bar dataKey="avaliacao" fill="#f59e0b" />
              </BarChart>
            </div>
            
            <div className="bg-white p-4 border rounded-lg">
              <h3 className="font-semibold mb-3 text-center">Distribuição de Satisfação</h3>
              <PieChart width={300} height={250}>
                <Pie
                  data={[
                    { name: 'Muito Satisfeitos (4.5+)', value: 25, fill: '#10b981' },
                    { name: 'Satisfeitos (4.0-4.4)', value: 35, fill: '#3b82f6' },
                    { name: 'Neutros (3.5-3.9)', value: 25, fill: '#f59e0b' },
                    { name: 'Insatisfeitos (<3.5)', value: 15, fill: '#ef4444' }
                  ]}
                  cx={150}
                  cy={125}
                  outerRadius={80}
                  dataKey="value"
                >
                  {faturamentoComparacao.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(lojas).map(([nome, dados]) => (
              <div key={nome} className={`p-4 rounded-lg text-center ${
                dados.avaliacaoMedia >= 4.5 ? 'bg-green-50' :
                dados.avaliacaoMedia >= 4.0 ? 'bg-blue-50' :
                dados.avaliacaoMedia >= 3.5 ? 'bg-yellow-50' : 'bg-red-50'
              }`}>
                <h4 className="font-semibold">{nome}</h4>
                <div className="flex justify-center items-center gap-1 my-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl font-bold">{dados.avaliacaoMedia}</span>
                </div>
                <p className={`text-xs font-medium ${
                  dados.avaliacaoMedia >= 4.5 ? 'text-green-700' :
                  dados.avaliacaoMedia >= 4.0 ? 'text-blue-700' :
                  dados.avaliacaoMedia >= 3.5 ? 'text-yellow-700' : 'text-red-700'
                }`}>
                  {dados.avaliacaoMedia >= 4.5 ? 'Excelente' :
                   dados.avaliacaoMedia >= 4.0 ? 'Muito Bom' :
                   dados.avaliacaoMedia >= 3.5 ? 'Regular' : 'Precisa Melhorar'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      titulo: "Performance e Eficiência Operacional",
      icone: <TrendingUp className="w-6 h-6" />,
      conteudo: () => (
        <div className="space-y-6">
          <div className="bg-white p-4 border rounded-lg">
            <h3 className="font-semibold mb-3 text-center">Radar de Performance</h3>
            <RadarChart width={600} height={350} data={[
              {
                loja: 'Loja A',
                Faturamento: (lojas['Loja A'].faturamento / 10000),
                Satisfacao: lojas['Loja A'].avaliacaoMedia * 20,
                Eficiencia: lojas['Loja A'].performance.eficiencia,
                Crescimento: Math.max(0, lojas['Loja A'].performance.crescimento + 10) * 10,
              },
              {
                loja: 'Loja B',
                Faturamento: (lojas['Loja B'].faturamento / 10000),
                Satisfacao: lojas['Loja B'].avaliacaoMedia * 20,
                Eficiencia: lojas['Loja B'].performance.eficiencia,
                Crescimento: Math.max(0, lojas['Loja B'].performance.crescimento + 10) * 10,
              },
              {
                loja: 'Loja C',
                Faturamento: (lojas['Loja C'].faturamento / 10000),
                Satisfacao: lojas['Loja C'].avaliacaoMedia * 20,
                Eficiencia: lojas['Loja C'].performance.eficiencia,
                Crescimento: Math.max(0, lojas['Loja C'].performance.crescimento + 10) * 10,
              },
              {
                loja: 'Loja D',
                Faturamento: (lojas['Loja D'].faturamento / 10000),
                Satisfacao: lojas['Loja D'].avaliacaoMedia * 20,
                Eficiencia: lojas['Loja D'].performance.eficiencia,
                Crescimento: Math.max(0, lojas['Loja D'].performance.crescimento + 10) * 10,
              }
            ]}>
              <PolarGrid />
              <PolarAngleAxis dataKey="loja" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar name="Loja A" dataKey="Loja A" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
              <Radar name="Loja B" dataKey="Loja B" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
              <Radar name="Loja C" dataKey="Loja C" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
              <Radar name="Loja D" dataKey="Loja D" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
              <Legend />
            </RadarChart>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 border rounded-lg">
              <h4 className="font-semibold mb-3">Crescimento (%)</h4>
              <BarChart width={200} height={200} data={faturamentoComparacao.map(item => ({
                ...item,
                crescimento: lojas[item.loja].performance.crescimento
              }))}>
                <XAxis dataKey="loja" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="crescimento" fill={(entry) => entry > 0 ? "#10b981" : "#ef4444"} />
              </BarChart>
            </div>
            
            <div className="bg-white p-4 border rounded-lg">
              <h4 className="font-semibold mb-3">Eficiência Operacional (%)</h4>
              <BarChart width={200} height={200} data={faturamentoComparacao}>
                <XAxis dataKey="loja" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="eficiencia" fill="#3b82f6" />
              </BarChart>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Resumo de Performance</h4>
              {Object.entries(lojas).map(([nome, dados]) => (
                <div key={nome} className={`p-3 rounded border-l-4 ${
                  dados.performance.eficiencia >= 80 ? 'border-green-500 bg-green-50' :
                  dados.performance.eficiencia >= 60 ? 'border-yellow-500 bg-yellow-50' :
                  'border-red-500 bg-red-50'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{nome}</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      dados.performance.crescimento > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {dados.performance.crescimento > 0 ? '+' : ''}{dados.performance.crescimento}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Eficiência: {dados.performance.eficiencia}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      titulo: "Recomendação Final",
      icone: <AlertTriangle className="w-6 h-6" />,
      conteudo: () => (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <h3 className="text-xl font-bold text-red-800">Recomendação: Vender a Loja C</h3>
            </div>
            
            <div className="space-y-4 text-red-700">
              <p className="text-lg font-semibold">
                Após análise detalhada dos dados, recomendo que o Senhor João venda a <strong>Loja C</strong> 
                para iniciar seu novo empreendimento.
              </p>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-red-800">Justificativas baseadas nos dados:</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border border-red-200">
                    <h5 className="font-semibold mb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Performance Financeira
                    </h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Menor faturamento:</strong> R$ 320.000 (53% menor que a líder)</li>
                      <li>• <strong>Menor volume de vendas:</strong> 2.100 unidades</li>
                      <li>• <strong>Ticket médio baixo:</strong> R$ 152 por venda</li>
                      <li>• <strong>Crescimento negativo:</strong> -5.7% no período</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded border border-red-200">
                    <h5 className="font-semibold mb-2 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Satisfação do Cliente
                    </h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Menor avaliação:</strong> 3.9 estrelas (abaixo de 4.0)</li>
                      <li>• <strong>Satisfação baixa:</strong> 3.2 pontos no índice interno</li>
                      <li>• <strong>Frete mais caro:</strong> R$ 18,20 (17% acima da média)</li>
                      <li>• <strong>Reclamações frequentes</strong> sobre atendimento</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded border border-red-200">
                    <h5 className="font-semibold mb-2 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4" />
                      Eficiência Operacional
                    </h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Menor eficiência:</strong> 45% (muito abaixo da média)</li>
                      <li>• <strong>Custos operacionais altos</strong> em relação à receita</li>
                      <li>• <strong>Mix de produtos</strong> focado em itens de baixo valor</li>
                      <li>• <strong>Localização menos estratégica</strong></li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded border border-red-200">
                    <h5 className="font-semibold mb-2 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Portfólio de Produtos
                    </h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Produtos de menor valor:</strong> ticket médio baixo</li>
                      <li>• <strong>Dependência de roupas:</strong> 40% das vendas</li>
                      <li>• <strong>Baixa margem:</strong> produtos commoditizados</li>
                      <li>• <strong>Pouca inovação</strong> no mix de produtos</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Vantagens de Vender a Loja C:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-700 text-sm">
              <div>
                <p>• <strong>Menor impacto financeiro</strong> na rede</p>
                <p>• <strong>Capital liberado</strong> para novo investimento</p>
                <p>• <strong>Foco nas lojas rentáveis</strong> (A, B, D)</p>
              </div>
              <div>
                <p>• <strong>Redução de custos</strong> operacionais</p>
                <p>• <strong>Elimina problema</strong> de baixa performance</p>
                <p>• <strong>Otimiza recursos</strong> para outras unidades</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 p-4 rounded">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Sugestão Adicional:</h4>
            <p className="text-blue-700 text-sm">
              Com o capital da venda da Loja C, o Senhor João pode investir na expansão das Lojas B e D, 
              que demonstram excelente performance, ou realocar recursos para melhorar a Loja A, 
              que tem potencial de recuperação com os investimentos corretos.
            </p>
          </div>
        </div>
      )
    }
  ];
  
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6">
          <div className="flex items-center gap-3 mb-2">
            <Store className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Análise de Performance - Alura Store</h1>
          </div>
          <p className="opacity-90">Decisão Estratégica: Qual loja vender para o novo empreendimento do Senhor João?</p>
        </div>
        
        <div className="p-6">
          {/* Resumo Executivo */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Object.entries(lojas).map(([nome, dados]) => (
              <div key={nome} className={`p-4 rounded-lg border-2 ${
                nome === 'Loja C' ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
              }`}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{nome}</h3>
                  {nome === 'Loja C' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  R$ {(dados.faturamento / 1000).toFixed(0)}k
                </p>
                <p className="text-sm text-gray-600">{dados.totalVendas} vendas</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{dados.avaliacaoMedia}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation */}
          <div className="flex space-x-2 mb-6 overflow-x-auto">
            {analises.map((analise, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentAnalysis(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                  currentAnalysis === idx 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {analise.icone}
                {analise.titulo}
              </button>
            ))}
          </div>
          
          {/* Content */}
          <div className="bg-white">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              {analises[currentAnalysis].icone}
              {analises[currentAnalysis].titulo}
            </h2>
            {analises[currentAnalysis].conteudo()}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentAnalysis(Math.max(0, currentAnalysis - 1))}
              disabled={currentAnalysis === 0}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
            >
              ← Anterior
            </button>
            <button
              onClick={() => setCurrentAnalysis(Math.min(analises.length - 1, currentAnalysis + 1))}
              disabled={currentAnalysis === analises.length - 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              Próximo →
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Resumo da Análise
        </h3>
        <p className="text-sm text-gray-600">
          Esta análise utilizou dados de faturamento, volume de vendas, avaliações de clientes, 
          categorias de produtos e métricas operacionais para identificar a loja com menor eficiência. 
          A Loja C apresentou os piores indicadores em todas as dimensões analisadas.
        </p>
      </div>
    </div>
  );
};

export default AluraStoreAnalysis;