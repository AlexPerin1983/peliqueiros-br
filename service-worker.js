
<!DOCTYPE html>
<html lang="pt-BR" class="h-full bg-gradient-to-r from-blue-50 via-white to-blue-50">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora de M² e Orçamento de Películas</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Montserrat:wght@700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
    <link rel="icon" href="icons/peliqueiros.png" type="image/png">
    <link rel="manifest" href="/peliqueiros-br/manifest.json">
    <meta name="theme-color" content="#000000">
    <style>

        
        /* Certificando que o popup será sempre visível */
        #popupCliente, #popupUsuario {
            z-index: 10000; /* Elevando o nível do popup */
        }
        

          /* Animação de carregamento */
    .loader {
        border: 8px solid #f3f3f3; /* Light grey */
        border-top: 8px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 48px;
        height: 48px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    </style>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    maxHeight: {
                        '70vh': '70vh',
                    }
                }
            }
        }
    </script>
</head>
<body class="h-full font-roboto text-gray-700 flex flex-col">
    <div class="flex-grow overflow-auto">
        <div class="container mx-auto px-2 py-6 w-full max-w-4xl">
            <div class="bg-white rounded-xl shadow-lg p-2 sm:p-4 mb-6">
                <!-- Cabeçalho -->
                <div class="mb-4">
                    <div class="text-center mb-2">
                        <h1 class="text-2xl sm:text-3xl font-montserrat text-gray-900 font-bold">Los_PelikoSs</h1>
                    </div>
                    <div class="flex items-center space-x-2">
                        <select id="clienteSelect" class="flex-grow p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" onchange="onClienteChange()">
                            <option value="">Selecione um cliente</option>
                        </select>
                      <!-- Botão para adicionar novo cliente -->
                      <button id="addNewClienteBtn" class="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 shadow-md sm:hidden" onclick="abrirPopup('adicionar')">
                        <i class="fas fa-user-plus"></i>
                    </button>
                    <button id="addNewClienteBtnDesktop" class="hidden sm:block w-auto p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 shadow-md">
                        <i class="fas fa-user-plus mr-2"></i> Adicionar Cliente
                    </button>
                    </div>

     <!-- ANIMAÇÃO ENTRADA CARREGANDO -->
<div id="splash-screen" class="fixed inset-0 bg-black flex items-center justify-center z-50">
    <div class="flex flex-col items-center">
        <!-- Animação de carregamento -->
        <div class="loader"></div>
    </div>
</div>

<!-- Contêiner Principal dos Ícones -->
<div class="flex justify-between items-center w-full mt-4 px-0">
    
    <!-- Botão Usuário à Esquerda -->
    <div class="relative group">
        <button 
            onclick="abrirPopupUsuario()" 
            class="p-2 bg-gray-200 text-purple-500 rounded-md hover:bg-gray-300 transition duration-300 shadow focus:outline-none focus:ring-2 focus:ring-purple-400" 
            aria-label="Configurações do Usuário"
        >
            <i class="fas fa-user-cog fa-lg"></i>
        </button>
        <!-- Tooltip Usuário -->
        <div class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Configurações do Usuário
        </div>
    </div>

    <!-- Grupo de Ações à Direita (Mapa, Editar, Excluir) -->
    <div class="flex space-x-2">
        <!-- Botão Mapa -->
        <div class="relative group">
            <button 
                onclick="abrirMapa()" 
                class="p-2 bg-gray-200 text-blue-500 rounded-md hover:bg-gray-300 transition duration-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-400" 
                aria-label="Abrir Mapa"
            >
                <i class="fas fa-map-marker-alt fa-lg"></i>
            </button>
            <!-- Tooltip Mapa -->
            <div class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Abrir Mapa
            </div>
        </div>

        <!-- Botão Editar -->
        <div class="relative group">
            <button 
                onclick="abrirPopup('editar')" 
                class="p-2 bg-gray-200 text-yellow-500 rounded-md hover:bg-gray-300 transition duration-300 shadow focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                aria-label="Editar Cliente"
            >
                <i class="fas fa-edit fa-lg"></i>
            </button>
            <!-- Tooltip Editar -->
            <div class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Editar Cliente
            </div>
        </div>

        <!-- Botão Excluir -->
        <div class="relative group">
            <button 
                onclick="confirmClearMedidas()" 
                class="p-2 bg-gray-200 text-red-500 rounded-md hover:bg-gray-300 transition duration-300 shadow focus:outline-none focus:ring-2 focus:ring-red-400" 
                aria-label="Excluir Cliente e Medidas"
            >
                <i class="fas fa-trash-alt fa-lg"></i>
            </button>
            <!-- Tooltip Excluir -->
            <div class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Excluir Cliente e Medidas
            </div>
        </div>
    </div>
</div>
</div>

                <!-- Conteúdo scrollável (grupos de medidas) -->
                <div id="medidasContainer" class="space-y-2 w-full pb-20 sm:pb-0">
                    <!-- Os grupos de medidas serão inseridos aqui dinamicamente -->
                </div>

                <!-- Resultado e botões para telas maiores -->
                <div class="hidden sm:block mt-4">
                    <div id="resultadoDesktop" class="text-right text-xl sm:text-2xl font-bold text-green-500 mb-4">Total M²: 0,00 | Preço Total: R$ 0,00</div>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <button onclick="addMedidaGroup(true)" class="w-full p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 shadow-md">
                            Adicionar Medida
                        </button>
                        <button onclick="duplicarMedidas()" class="w-full p-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 shadow-md">
                            Duplicar Medidas
                        </button>
                        <button id="generatePdfButton" class="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 shadow-md">
                            Gerar PDF
                        </button>
                        <button onclick="copyShareURL()" class="w-full p-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 shadow-md">
                            Compartilhar URL
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Rodapé fixo para mobile -->
    <div class="sm:hidden fixed bottom-0 left-0 right-0 bg-white bg-opacity-85 shadow-lg border-t border-gray-800">
        <div class="container mx-auto px-2 py-3">
            <div id="resultadoMobile" class="text-center text-lg font-bold text-black-100 mb-2">Total M²: 0,00 | R$ 0,00</div>
            <div class="flex justify-around items-center">
                <button onclick="addMedidaGroup(true)" class="p-2 text-black-100 hover:text-yellow-300 transition duration-300">
                    <i class="fas fa-plus-circle text-2xl"></i>
                </button>
                <button onclick="duplicarMedidas()" class="p-2 text-black-100 hover:text-yellow-300 transition duration-300">
                    <i class="fas fa-copy text-2xl"></i>
                </button>
                <button id="generatePdfButtonMobile" class="p-2 text-black-100 hover:text-yellow-300  transition duration-300">
                    <i class="fas fa-file-pdf text-2xl"></i>
                </button>
                <button onclick="copyShareURL()" class="p-2 text-black-100 hover:text-yellow-300 transition duration-300">
                    <i class="fas fa-share-alt text-2xl"></i>
                </button>
            </div>
        </div>
    </div>


<!-- Popup de Cadastro de Usuário -->
<div id="popupUsuario" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ease-in-out z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out max-w-lg w-full mx-4 sm:mx-0">
        
        <!-- Cabeçalho do Popup -->
        <div class="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">Minha Empresa</h2>
            <button onclick="fecharPopupUsuario()" class="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        
        <!-- Corpo do Popup -->
        <div class="p-6 space-y-6 max-h-70vh overflow-y-auto">
            <form id="userForm" class="space-y-4">
                <!-- Campo de Logotipo -->
                <div>
                    <label for="logo" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Logotipo</label>
                    <input type="file" id="logo" accept="image/*" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 dark:bg-gray-700 dark:text-gray-100">
                    <img id="logoPreview" src="" alt="Preview do logotipo" class="mt-2 hidden max-h-20 rounded-md">
                </div>
                
                <!-- Campo de Cores -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Cores</label>
                    <div class="flex items-center space-x-6 mt-2">
                        <!-- Cor Primária -->
                        <div>
                            <span class="text-sm text-gray-500 dark:text-gray-400">Primária</span>
                            <div id="primaryColorPreview" class="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 cursor-pointer mt-1" onclick="document.getElementById('primaryColor').click()"></div>
                            <input type="color" id="primaryColor" class="hidden">
                        </div>
                        <!-- Cor Secundária -->
                        <div>
                            <span class="text-sm text-gray-500 dark:text-gray-400">Secundária</span>
                            <div id="secondaryColorPreview" class="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 cursor-pointer mt-1" onclick="document.getElementById('secondaryColor').click()"></div>
                            <input type="color" id="secondaryColor" class="hidden">
                        </div>
                    </div>
                </div>
                
                <!-- Campos de Informação -->
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label>
                    <input type="text" id="name" required class="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100">
                </div>
                
                <div>
                    <label for="companyName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome da Empresa</label>
                    <input type="text" id="companyName" required class="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100">
                </div>
                
                <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label>
                    <input type="tel" id="phone" required class="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100">
                </div>
                
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input type="email" id="email" required class="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100">
                </div>
                
                <div>
                    <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Endereço</label>
                    <input type="text" id="address" required class="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100">
                </div>
                
                <div>
                    <label for="cpfCnpj" class="block text-sm font-medium text-gray-700 dark:text-gray-300">CPF/CNPJ</label>
                    <input type="text" id="cpfCnpj" required class="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100">
                </div>
            </form>
        </div>
        
        <!-- Rodapé do Popup com Salvar e Ícone de Cifrão -->
        <div class="flex justify-end items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 space-x-4">
            <button 
                id="saveUserInfoButton" 
                type="submit" 
                form="userForm" 
                class="flex-grow px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 shadow-md flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onclick="salvarUsuario()"
            >
                <span>Salvar</span>
            </button>
            <button 
                onclick="abrirPopupPaymentMethods()" 
                class="p-2 bg-gray-200 text-green-500 rounded-md hover:bg-gray-300 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label="Métodos de Pagamento"
            >
                <i class="fas fa-dollar-sign fa-lg"></i>
            </button>
        </div>
    </div>
</div>


    <!-- Popup de Formas de Pagamento -->
<div id="popupPaymentMethods" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ease-in-out z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out max-w-md w-full mx-4 sm:mx-0">
        <div class="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">Formas de Pagamento</h2>
            <button onclick="fecharPopupPaymentMethods()" class="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <form id="paymentMethodsForm" class="p-6 space-y-4">
            <!-- Pix -->
            <div class="flex items-center">
                <input type="checkbox" id="pix" name="payment_methods" value="pix" class="form-checkbox h-4 w-4 text-blue-600 rounded">
                <label for="pix" class="ml-2 text-gray-700 dark:text-gray-300">Pix</label>
            </div>
            <!-- Boleto -->
            <div class="flex items-center">
                <input type="checkbox" id="boleto" name="payment_methods" value="boleto" class="form-checkbox h-4 w-4 text-blue-600 rounded">
                <label for="boleto" class="ml-2 text-gray-700 dark:text-gray-300">Boleto</label>
            </div>
            <!-- Até 12x sem Juros -->
            <div class="flex items-center">
                <input type="checkbox" id="parcelado_sem_juros" name="payment_methods" value="parcelado_sem_juros" class="form-checkbox h-4 w-4 text-blue-600 rounded">
                <label for="parcelado_sem_juros" class="ml-2 text-gray-700 dark:text-gray-300">Até 12x sem Juros</label>
            </div>
            <div class="ml-6">
                <label for="parcelas_sem_juros" class="block text-sm text-gray-700 dark:text-gray-300">Número de Parcelas:</label>
                <input type="number" id="parcelas_sem_juros" name="parcelas_sem_juros" min="1" max="12" placeholder="Até 12" class="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100">
            </div>
            <!-- 12x com Juros -->
            <div class="flex items-center">
                <input type="checkbox" id="parcelado_com_juros" name="payment_methods" value="parcelado_com_juros" class="form-checkbox h-4 w-4 text-blue-600 rounded">
                <label for="parcelado_com_juros" class="ml-2 text-gray-700 dark:text-gray-300">12x com Juros</label>
            </div>
            <div class="ml-6">
                <label for="parcelas_com_juros" class="block text-sm text-gray-700 dark:text-gray-300">Número de Parcelas:</label>
                <input type="number" id="parcelas_com_juros" name="parcelas_com_juros" min="1" max="12" placeholder="Até 12" class="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100">
            </div>
            <div class="ml-6">
                <label for="taxa_juros" class="block text-sm text-gray-700 dark:text-gray-300">Taxa de Juros: (%):</label>
                <input type="number" id="taxa_juros" name="taxa_juros" step="0.01" min="0" placeholder="Ex: 2.99" class="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100">
            </div>
              <!-- Novos Campos: Adiantamento em Porcentagem -->
              <div class="flex items-center">
                <input type="checkbox" id="solicitar_adiantamento" class="form-checkbox h-4 w-4 text-blue-600 rounded">
                <label for="solicitar_adiantamento" class="ml-2 text-gray-700 dark:text-gray-300">Solicitar Adiantamento</label>
                <input type="number" id="porcentagem_adiantamento" placeholder="Porcentagem (%)" class="ml-4 p-1 border border-gray-300 rounded-md w-24 hidden">
            </div>

            <!-- Novos Campos: Observação -->
            <div class="flex items-center">
                <input type="checkbox" id="adicionar_observacao" class="form-checkbox h-4 w-4 text-blue-600 rounded">
                <label for="adicionar_observacao" class="ml-2 text-gray-700 dark:text-gray-300">Adicionar Observação</label>
            </div>
            <div id="campo_observacao" class="hidden">
                <textarea id="observacao" placeholder="Escreva sua observação aqui..." class="w-full p-2 border border-gray-300 rounded-md"></textarea>
            </div>
            <!-- Botão de Salvar -->
            <button type="submit" class="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 shadow-md">
                Salvar
            </button>
        </form>
    </div>
</div>



<!-- Popup de Cadastro de Cliente -->
<div id="popupCliente" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ease-in-out z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out max-w-md w-full mx-4 sm:mx-0">
        <div class="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 id="popupTitulo" class="text-xl font-semibold text-gray-800 dark:text-gray-100">Adicionar Novo Cliente</h2>
            <button onclick="fecharPopupCliente()" class="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <form id="clienteForm" class="p-6 space-y-4">
            <div>
                <label for="popupClienteNome" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome do Cliente</label>
                <input type="text" id="popupClienteNome" class="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100" placeholder="Nome do Cliente" required>
            </div>
            <div>
                <label for="popupClienteTelefone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label>
                <input type="tel" id="popupClienteTelefone" class="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100" placeholder="Telefone" inputmode="tel" required>
            </div>
            <div>
                <label for="popupClienteEndereco" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Endereço</label>
                <input type="text" id="popupClienteEndereco" class="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100" placeholder="Endereço" required>
            </div>
            <!-- Campo Unificado CPF/CNPJ -->
            <div>
                <label for="popupClienteCpfCnpj" class="block text-sm font-medium text-gray-700 dark:text-gray-300">CPF/CNPJ</label>
                <input type="text" id="popupClienteCpfCnpj" class="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100" placeholder="CPF ou CNPJ" inputmode="numeric">
            </div>
            
            <!-- Novo Campo de Email -->
            <div>
                <label for="popupClienteEmail" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input type="email" id="popupClienteEmail" class="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100" placeholder="Email" required>
            </div>
            <button type="submit" id="popupClienteBtnSalvar" class="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 shadow-md">
                Salvar Cliente
            </button>
        </form>
    </div>
</div>

    <script>
  let currentEditPelicula = null;
  let ultimaPeliculaSalva = null; // Variável global para rastrear a última película salva

        // Registro do Service Worker
        if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/peliqueiros-br/service-worker.js')
    .then((registration) => {
        // Verifica se há um service worker esperando para ser ativado
        if (registration.waiting) {
            notifyUserAboutUpdate(registration.waiting);
            return;
        }

        // Escuta atualizações no service worker
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;

            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed') {
                    // Se o novo service worker foi instalado e já está esperando
                    if (navigator.serviceWorker.controller) {
                        notifyUserAboutUpdate(newWorker);
                    }
                }
            });
        });
    })
    .catch((error) => {
        console.error('Erro ao registrar o service worker:', error);
    });
}

    // Remover a splash screen após o carregamento do aplicativo
    window.addEventListener('load', () => {
        const splashScreen = document.getElementById('splash-screen');
        splashScreen.style.display = 'none'; // ou use uma animação para fade-out
    });
    
    let currentSelectForPelicula = null;


        // Array de películas predefinidas
        const peliculasPredefinidas = [
            { nome: "Color Stable", preco: 220 },
            { nome: "Origin Carbon", preco: 120 },
            { nome: "Window Blue Performance", preco: 240 },
            { nome: "Silver 10 Externa", preco: 280 },
            { nome: "Vinil Blackout", preco: 130 },
            { nome: "Vinil Jateado", preco: 120 },
        ];

        let peliculas = [...peliculasPredefinidas];
        let clientes = [];
        let clienteSelecionado = '';
      

  
// Arrays para ambientes e tipos de aplicação
const ambientes = [
    "Desconhecido", "Academia", "Adega", "Área de Lazer", "Área de Serviço", "Área Externa", "Auditório", 
    "Banheiro", "Balcão", "Barbearia", "Biblioteca", "Churrasqueira", "Cinema", "Closet", "Copa", "Corredor", 
    "Cozinha", "Depósito", "Despensa", "Elevador", "Escada", "Escritorio", "Estúdio", "Garagem", "Garita", 
    "Garita fundo", "Hall de Entrada", "Jardim", "Lavanderia", "Loja", "Piscina", "Portaria", "Porão", 
    "Quarto", "Quintal", "Recepção", "Refeitorio", "Sala", "Sotão", "Spa", "Terraço", "Varanda"
];

const tiposAplicacao = [
    "Desconhecido", "Armário", "Balcão", "Basculante", "Box de banheiro", "Cobogó de Vidro",
    "Cobertura de Vidro", "Divisória de Vidro", "Espelho", "Fachada", "Guarda-corpo",
    "Janela Basculante", "Janela de correr", "Janela Integrada", "Janela pivotante", "Painel de Vidro", 
    "Parede divisória", "Parapeito", "Porta", "Porta Balcão", "Porta de Corre", "Porta Dupla",
    "Porta Dupla C/P e F", "Sacada de Vidro", "Tampo de mesa", "Teto", "Toldo de Vidro", "Veneziana", "Vidro Fixo", "Vitrine"
];


//ABRIR GOOGLE MAPS
function abrirMapa() {
    const clienteId = document.getElementById('clienteSelect').value;
    if (!clienteId) {
        alert('Selecione um cliente.');
        return;
    }

    obterClienteDoIndexedDB(clienteId).then(cliente => {
        if (cliente && cliente.endereco) {
            const endereco = encodeURIComponent(cliente.endereco);
            const url = `https://www.google.com/maps/search/?api=1&query=${endereco}`;
            window.open(url, '_blank');
        } else {
            alert('Endereço não encontrado para este cliente.');
        }
    }).catch(error => {
        console.error('Erro ao abrir o mapa:', error);
    });
}


// Função para abrir o popup de Formas de Pagamento
function abrirPopupPaymentMethods() {
    console.log('Abrindo popup de Formas de Pagamento');
    // Fechar o popup de usuário
    fecharPopupUsuario();
    
    // Abrir o popup de formas de pagamento
    const popupPaymentMethods = document.getElementById('popupPaymentMethods');
    if (popupPaymentMethods) {
        popupPaymentMethods.classList.remove('hidden');
        const modalContent = popupPaymentMethods.querySelector('div');
        modalContent.classList.add('scale-95');
        setTimeout(() => {
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }, 10);
        carregarFormasPagamento(); // Carrega as formas de pagamento ao abrir
    } else {
        console.error('Elemento popupPaymentMethods não encontrado');
    }
}



// Função para fechar o popup de Formas de Pagamento
function fecharPopupPaymentMethods() {
    console.log('Fechando popup de Formas de Pagamento');
    const popupPaymentMethods = document.getElementById('popupPaymentMethods');
    if (popupPaymentMethods) {
        const modalContent = popupPaymentMethods.querySelector('div');
        modalContent.classList.add('scale-95');
        modalContent.classList.remove('scale-100');
        setTimeout(() => {
            popupPaymentMethods.classList.add('hidden');
            // Removido: abrirPopupUsuario();
            console.log('Popup de Formas de Pagamento fechado');
        }, 300); // Tempo deve coincidir com a duração da transição
    } else {
        console.error('Elemento popupPaymentMethods não encontrado para fechar');
    }
}



// Função para carregar as formas de pagamento do IndexedDB
async function carregarFormasPagamento() {
    try {
        const infoUsuario = await obterInformacoesUsuarioDoIndexedDB();
        const formasPagamento = infoUsuario.payment_methods || [];

        // Listagem de IDs dos checkboxes e inputs
        const checkboxIds = ['pix', 'boleto', 'parcelado_sem_juros', 'parcelado_com_juros'];
        const camposAdicionais = ['parcelas_sem_juros', 'parcelas_com_juros', 'taxa_juros'];
        const adiantamentoCheckbox = document.getElementById('solicitar_adiantamento');
        const porcentagemAdiantamentoInput = document.getElementById('porcentagem_adiantamento');
        const observacaoCheckbox = document.getElementById('adicionar_observacao');
        const observacaoDiv = document.getElementById('campo_observacao');
        const observacaoInput = document.getElementById('observacao');

        // Resetar todos os checkboxes e campos adicionais
        checkboxIds.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = false;
            }
        });

        camposAdicionais.forEach(id => {
            const campo = document.getElementById(id);
            if (campo) {
                campo.value = '';
            }
        });

        // Resetar os novos campos
        adiantamentoCheckbox.checked = false;
        porcentagemAdiantamentoInput.classList.add('hidden');
        porcentagemAdiantamentoInput.value = '';

        observacaoCheckbox.checked = false;
        observacaoDiv.classList.add('hidden');
        observacaoInput.value = '';

        // Iterar sobre as formas de pagamento e marcar as selecionadas
        formasPagamento.forEach(method => {
            switch (method.tipo) {
                case 'pix':
                    const pixCheckbox = document.getElementById('pix');
                    if (pixCheckbox) {
                        pixCheckbox.checked = method.ativo;
                    }
                    break;
                case 'boleto':
                    const boletoCheckbox = document.getElementById('boleto');
                    if (boletoCheckbox) {
                        boletoCheckbox.checked = method.ativo;
                    }
                    break;
                case 'parcelado_sem_juros':
                    const parceladoSemJurosCheckbox = document.getElementById('parcelado_sem_juros');
                    const parcelasSemJurosInput = document.getElementById('parcelas_sem_juros');
                    if (parceladoSemJurosCheckbox) {
                        parceladoSemJurosCheckbox.checked = method.ativo;
                    }
                    if (parcelasSemJurosInput) {
                        parcelasSemJurosInput.value = method.parcelas_max || '';
                    }
                    break;
                case 'parcelado_com_juros':
                    const parceladoComJurosCheckbox = document.getElementById('parcelado_com_juros');
                    const parcelasComJurosInput = document.getElementById('parcelas_com_juros');
                    const taxaJurosInput = document.getElementById('taxa_juros');
                    if (parceladoComJurosCheckbox) {
                        parceladoComJurosCheckbox.checked = method.ativo;
                    }
                    if (parcelasComJurosInput) {
                        parcelasComJurosInput.value = method.parcelas_max || '';
                    }
                    if (taxaJurosInput) {
                        taxaJurosInput.value = method.juros || '';
                    }
                    break;
                case 'adiantamento':
                    if (method.ativo) {
                        adiantamentoCheckbox.checked = true;
                        porcentagemAdiantamentoInput.classList.remove('hidden');
                        porcentagemAdiantamentoInput.value = method.porcentagem || '';
                    }
                    break;
                case 'observacao':
                    if (method.ativo) {
                        observacaoCheckbox.checked = true;
                        observacaoDiv.classList.remove('hidden');
                        observacaoInput.value = method.texto || '';
                    }
                    break;
                default:
                    console.warn(`Tipo de forma de pagamento desconhecido: ${method.tipo}`);
            }
        });
    } catch (error) {
        console.error('Erro ao carregar formas de pagamento:', error);
    }
}





// Função para salvar as formas de pagamento no IndexedDB
async function salvarFormasPagamento(event) {
    event.preventDefault();
    console.log('Evento submit capturado em salvarFormasPagamento');

    try {
        const formasPagamento = [];

        // Pix
        const pixAtivo = document.getElementById('pix').checked;
        formasPagamento.push({
            tipo: 'pix',
            ativo: pixAtivo
        });

        // Boleto
        const boletoAtivo = document.getElementById('boleto').checked;
        formasPagamento.push({
            tipo: 'boleto',
            ativo: boletoAtivo
        });

        // Parcelado sem Juros
        const parceladoSemJurosAtivo = document.getElementById('parcelado_sem_juros').checked;
        const parcelasSemJuros = parseInt(document.getElementById('parcelas_sem_juros').value) || null;
        if (parceladoSemJurosAtivo) {
            formasPagamento.push({
                tipo: 'parcelado_sem_juros',
                ativo: true,
                parcelas_max: parcelasSemJuros
            });
        }
        

        // Parcelado com Juros
        const parceladoComJurosAtivo = document.getElementById('parcelado_com_juros').checked;
        const parcelasComJuros = parseInt(document.getElementById('parcelas_com_juros').value) || null;
        const taxaJuros = parseFloat(document.getElementById('taxa_juros').value) || null;
        if (parceladoComJurosAtivo) {
            formasPagamento.push({
                tipo: 'parcelado_com_juros',
                ativo: true,
                parcelas_max: parcelasComJuros,
                juros: taxaJuros
            });
        }

            // Adiantamento em Porcentagem
            const solicitarAdiantamento = document.getElementById('solicitar_adiantamento').checked;
        const porcentagemAdiantamento = parseFloat(document.getElementById('porcentagem_adiantamento').value) || null;
        if (solicitarAdiantamento) {
            formasPagamento.push({
                tipo: 'adiantamento',
                ativo: true,
                porcentagem: porcentagemAdiantamento
            });
        }

        // Observação
        const adicionarObservacao = document.getElementById('adicionar_observacao').checked;
        const observacao = document.getElementById('observacao').value.trim();
        if (adicionarObservacao) {
            formasPagamento.push({
                tipo: 'observacao',
                ativo: true,
                texto: observacao
            });
        }

        // Validações
        for (let method of formasPagamento) {
            if (method.tipo === 'parcelado_sem_juros' && (!method.parcelas_max || method.parcelas_max > 12)) {
                alert('Número de parcelas sem juros deve ser entre 1 e 12.');
                console.log('Validação falhou para parcelado_sem_juros');
                return;
            }
            if (method.tipo === 'parcelado_com_juros') {
                if (!method.parcelas_max || method.parcelas_max > 12) {
                    alert('Número de parcelas com juros deve ser entre 1 e 12.');
                    console.log('Validação falhou para parcelado_com_juros - parcelas_max');
                    return;
                }
                if (method.juros === null || method.juros < 0) {
                    alert('Taxa de juros deve ser um valor positivo.');
                    console.log('Validação falhou para parcelado_com_juros - juros');
                    return;
                }
            }
        }

        // Obter informações do usuário
        const infoUsuario = await obterInformacoesUsuarioDoIndexedDB();
        infoUsuario.payment_methods = formasPagamento;

        await salvarInformacoesUsuarioNoIndexedDB(infoUsuario);
        fecharPopupPaymentMethods();
        alert('Formas de pagamento salvas com sucesso!');
        console.log('Formas de pagamento salvas com sucesso');
    } catch (error) {
        console.error('Erro ao salvar formas de pagamento:', error);
        alert('Ocorreu um erro ao salvar as formas de pagamento. Por favor, tente novamente.');
    }
}






// Funções para adicionar opções personalizadas
function onAmbienteChange(select) {
    if (select.value === 'Outra') {
        abrirPopupAmbientePersonalizado();
    }
    calculateTotal();
}

function onTipoAplicacaoChange(select) {
    if (select.value === 'Outra') {
        abrirPopupTipoAplicacaoPersonalizado();
    }
    calculateTotal();
}

function notifyUserAboutUpdate(worker) {
    const updateBar = document.createElement('div');
    updateBar.innerText = "Nova versão disponível. Clique aqui para atualizar.";
    updateBar.style.position = 'fixed';
    updateBar.style.bottom = '0';
    updateBar.style.left = '0';
    updateBar.style.width = '100%';
    updateBar.style.backgroundColor = '#f39c12';
    updateBar.style.color = 'white';
    updateBar.style.textAlign = 'center';
    updateBar.style.padding = '10px';
    updateBar.style.cursor = 'pointer';
    updateBar.addEventListener('click', () => {
        worker.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
    });

    document.body.appendChild(updateBar);
}


function abrirPopupAmbientePersonalizado() {
    const popupHTML = `
        <div id="popupAmbientePersonalizado" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg shadow-lg relative max-w-md w-full">
                <h2 class="text-xl font-semibold mb-4">Adicionar Ambiente Personalizado</h2>
                <input type="text" id="nomeAmbientePersonalizado" class="w-full p-2 mb-4 border border-gray-300 rounded-md" placeholder="Nome do Ambiente">
                <button id="salvarAmbientePersonalizado" class="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">Salvar Ambiente</button>
                <button onclick="fecharPopupAmbientePersonalizado()" class="mt-2 w-full p-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300">Cancelar</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    document.getElementById('salvarAmbientePersonalizado').addEventListener('click', salvarAmbientePersonalizado);
}

function fecharPopupAmbientePersonalizado() {
    const popup = document.getElementById('popupAmbientePersonalizado');
    if (popup) {
        popup.remove();
    }
}


function abrirPopupTipoAplicacaoPersonalizado() {
    const popupHTML = `
        <div id="popupTipoAplicacaoPersonalizado" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg shadow-lg relative max-w-md w-full">
                <h2 class="text-xl font-semibold mb-4">Adicionar Tipo de Aplicação Personalizado</h2>
                <input type="text" id="nomeTipoAplicacaoPersonalizado" class="w-full p-2 mb-4 border border-gray-300 rounded-md" placeholder="Nome do Tipo de Aplicação">
                <button id="salvarTipoAplicacaoPersonalizado" class="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">Salvar Tipo de Aplicação</button>
                <button onclick="fecharPopupTipoAplicacaoPersonalizado()" class="mt-2 w-full p-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300">Cancelar</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    document.getElementById('salvarTipoAplicacaoPersonalizado').addEventListener('click', salvarTipoAplicacaoPersonalizado);
}

function fecharPopupTipoAplicacaoPersonalizado() {
    const popup = document.getElementById('popupTipoAplicacaoPersonalizado');
    if (popup) {
        popup.remove();
    }
}


async function salvarAmbientePersonalizado() {
    const nome = document.getElementById('nomeAmbientePersonalizado').value.trim();
    if (nome) {
        const ambiente = { nome };
        await salvarAmbienteNoIndexedDB(ambiente);
        fecharPopupAmbientePersonalizado();
        await atualizarSeletoresAmbientes();
        calculateTotal();
    } else {
        alert('Por favor, preencha o campo corretamente.');
    }
}

async function salvarTipoAplicacaoPersonalizado() {
    const nome = document.getElementById('nomeTipoAplicacaoPersonalizado').value.trim();
    if (nome) {
        await salvarTipoAplicacaoNoIndexedDB(nome);
        fecharPopupTipoAplicacaoPersonalizado();
        await atualizarSeletoresTiposAplicacao();
        calculateTotal();
    } else {
        alert('Por favor, preencha o campo corretamente.');
    }
}



async function salvarAmbienteNoIndexedDB(ambiente) {
    const db = await abrirIndexedDB();
    const transaction = db.transaction(['ambientes_personalizados'], 'readwrite');
    const store = transaction.objectStore('ambientes_personalizados');
    const request = store.put(ambiente);

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}


async function salvarTipoAplicacaoNoIndexedDB(tipoAplicacao) {
    const db = await abrirIndexedDB();
    const transaction = db.transaction(['tipos_aplicacao_personalizados'], 'readwrite');
    const store = transaction.objectStore('tipos_aplicacao_personalizados');
    const request = store.put({ nome: tipoAplicacao });

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}



async function atualizarSeletoresAmbientes() {
    const ambientesPersonalizados = await carregarAmbientesPersonalizadosDoIndexedDB();
    const seletores = document.querySelectorAll('.ambiente-select');
    seletores.forEach(seletor => {
        const selectedValue = seletor.value;
        seletor.innerHTML = [...ambientes, ...ambientesPersonalizados.map(a => a.nome)].map(amb => `<option value="${amb}">${amb}</option>`).join('');
        seletor.innerHTML += '<option value="Outra">Outra</option>';
        seletor.value = selectedValue;
    });
}

async function atualizarSeletoresTiposAplicacao() {
    const tiposPersonalizados = await carregarTiposAplicacaoPersonalizadosDoIndexedDB();
    const seletores = document.querySelectorAll('.tipo-aplicacao-select');
    seletores.forEach(seletor => {
        const selectedValue = seletor.value;
        seletor.innerHTML = [...tiposAplicacao, ...tiposPersonalizados.map(t => t.nome)].map(tipo => `<option value="${tipo}">${tipo}</option>`).join('');
        seletor.innerHTML += '<option value="Outra">Outra</option>';
        seletor.value = selectedValue;
    });
}

        async function carregarClientes(clienteSelecionado = '', moverParaTopo = false) {
            try {
                const clienteSelect = document.getElementById('clienteSelect');
                if (!clienteSelect) {
                    console.error("Elemento clienteSelect não encontrado!");
                    return;
                }

                clientes = await obterTodosClientesDoIndexedDB();

                if (moverParaTopo && clienteSelecionado) {
                    const clienteIndex = clientes.findIndex(c => c.id == clienteSelecionado);
                    if (clienteIndex > -1) {
                        const cliente = clientes.splice(clienteIndex, 1)[0];
                        clientes.unshift(cliente);
                    }
                }

                clienteSelect.innerHTML = '<option value="">Selecione um cliente</option>';

                if (clientes.length > 0) {
                    clienteSelect.classList.remove('hidden');
                    clientes.forEach(cliente => {
                        const option = document.createElement('option');
                        option.value = cliente.id;
                        option.textContent = cliente.nome;
                        clienteSelect.appendChild(option);
                    });

                    if (clienteSelecionado) {
                        clienteSelect.value = clienteSelecionado;
                    } else {
                        clienteSelect.value = clientes[0].id;
                    }

                    onClienteChange();
                    mostrarEditIconContainer(true);
                } else {
                    clienteSelect.classList.add('hidden');
                    mostrarEditIconContainer(false);
                }
            } catch (error) {
                console.error("Erro ao carregar clientes:", error);
            }
        }

        function onClienteChange() {
            clienteSelecionado = document.getElementById('clienteSelect').value;
            loadMedidas();
            if (clienteSelecionado) {
                mostrarEditIconContainer(true);
            } else {
                mostrarEditIconContainer(false);
            }
        }

        function mostrarEditIconContainer(exibir) {
            const editIconContainer = document.getElementById('editIconContainer');
            if (exibir && document.getElementById('clienteSelect').value) {
                editIconContainer.classList.remove('hidden');
            } else {
                editIconContainer.classList.add('hidden');
            }
        }



        function updateResultado(m2, preco) {
            const resultadoDesktop = document.getElementById('resultadoDesktop');
            const resultadoMobile = document.getElementById('resultadoMobile');
            
            if (resultadoDesktop) {
                resultadoDesktop.textContent = `Total M²: ${m2.toFixed(2)} | Preço Total: R$ ${preco.toFixed(2)}`;
            }
            if (resultadoMobile) {
                resultadoMobile.textContent = `Total M²: ${m2.toFixed(2)} | R$ ${preco.toFixed(2)}`;
            }
        }

        function atualizarIconeVerificacao(status) {
            const icone = document.getElementById('verificacaoIcon');
            if (status === 'ativado') {
                icone.classList.remove('hidden');
            } else {
                icone.classList.add('hidden');
            }
        }

        $(document).ready(function () {
    function formatarTelefone(telefone) {
        let numeros = telefone.replace(/\D/g, '');
        if (numeros.startsWith('55') && numeros.length > 11) {
            numeros = numeros.slice(2);
        }
        if (numeros.length === 11) {
            return `(${numeros.slice(0,2)}) ${numeros.slice(2,7)}-${numeros.slice(7)}`;
        } else if (numeros.length === 10) {
            return `(${numeros.slice(0,2)}) ${numeros.slice(2,6)}-${numeros.slice(6)}`;
        } else {
            return telefone;
        }
    }

    function aplicarMascaraTelefone(elemento) {
        $(elemento).on('paste', function(e) {
            e.preventDefault();
            let texto = (e.originalEvent || e).clipboardData.getData('text/plain');
            $(this).val(formatarTelefone(texto));
        });

        $(elemento).mask('(00) 00000-0000', {
            onKeyPress: function(val, e, field, options) {
                field.mask(val.length > 14 ? '(00) 00000-0000' : '(00) 0000-00009', options);
            }
        });
    }

    // Aplicar máscara para campos de telefone
    aplicarMascaraTelefone('#popupClienteTelefone');
    aplicarMascaraTelefone('#telefoneClienteInput');
    aplicarMascaraTelefone('#phone'); // Campo de telefone no popup de usuário








// Máscara para o campo CPF/CNPJ no popup de Cliente
$('#popupClienteCpfCnpj').mask('000.000.000-00', {
    onKeyPress: function(cpfCnpj, e, field, options) {
        var masks = ['000.000.000-000', '00.000.000/0000-00'];
        var mask = (cpfCnpj.length > 14) ? masks[1] : masks[0];
        $('#popupClienteCpfCnpj').mask(mask, options);
    }
});



    // Máscara para o campo CPF/CNPJ no popup de usuário
    $('#cpfCnpj').mask('000.000.000-00', {
        onKeyPress: function(cpfcnpj, e, field, options) {
            var masks = ['000.000.000-000', '00.000.000/0000-00'];
            var mask = (cpfcnpj.length > 14) ? masks[1] : masks[0];
            $('#cpfCnpj').mask(mask, options);
        }
    });
});

 // Função para abrir o popup de Cliente seguindo o padrão do popup de Usuário
function abrirPopup(acao) {
    console.log("Popup acionado para:", acao);

    const popupCliente = document.getElementById('popupCliente');
    const popupTitulo = document.getElementById('popupTitulo');
    const clienteSelect = document.getElementById('clienteSelect');

    if (!popupCliente || !popupTitulo || !clienteSelect) {
        console.error("Elementos necessários não encontrados");
        return;
    }

    if (acao === 'adicionar') {
        popupTitulo.innerText = 'Adicionar Novo Cliente';
        limparCamposPopup();
        clienteSelecionado = '';
        console.log("Configurado para adicionar um novo cliente.");
    } else if (acao === 'editar') {
        clienteSelecionado = clienteSelect.value;
        if (!clienteSelecionado) {
            console.error("Nenhum cliente selecionado para editar.");
            return;
        }
        popupTitulo.innerText = 'Editar Cliente';
        console.log("Editando cliente:", clienteSelecionado);
        carregarDadosCliente(clienteSelecionado);
    } else {
        console.error("Ação desconhecida passada para abrirPopup:", acao);
        return;
    }

    // Remover a classe 'hidden' para exibir o popup
    popupCliente.classList.remove('hidden');

    // Adicionar classe 'scale-95' para iniciar a animação
    const modalContent = popupCliente.querySelector('div');
    modalContent.classList.add('scale-95');

    // Remover 'scale-95' e adicionar 'scale-100' após um breve intervalo para acionar a transição
    setTimeout(() => {
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }, 10);

    console.log("Popup deve aparecer agora:", popupCliente);
}

        function limparCamposPopup() {
            document.getElementById('popupClienteNome').value = '';
            document.getElementById('popupClienteTelefone').value = '';
            document.getElementById('popupClienteEndereco').value = '';
            document.getElementById('popupClienteCpfCnpj').value = '';

        }

        // Função para carregar os dados do cliente no popupCliente (modo editar)
        async function carregarDadosCliente(clienteId) {
    const cliente = await obterClienteDoIndexedDB(clienteId);
    if (cliente) {
        document.getElementById('popupClienteNome').value = cliente.nome;
        document.getElementById('popupClienteTelefone').value = cliente.telefone;
        document.getElementById('popupClienteEndereco').value = cliente.endereco;
        document.getElementById('popupClienteCpfCnpj').value = cliente.cpfCnpj || ''; // Preencher o campo unificado
        document.getElementById('popupClienteEmail').value = cliente.email || ''; // Preencher o email
        
        
    }
}


// Função para abrir o popupUsuario com animação
function abrirPopupUsuario() {
    const popupUsuario = document.getElementById('popupUsuario');
    popupUsuario.classList.remove('hidden');
    const modalContent = popupUsuario.querySelector('div');
    modalContent.classList.add('scale-95');
    setTimeout(() => {
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }, 10);
    carregarInformacoesUsuario(); // Carrega os dados do usuário ao abrir
}
// Função para fechar qualquer popup adicional, se necessário



        async function carregarInformacoesUsuario() {
            try {
                const info = await obterInformacoesUsuarioDoIndexedDB();
                if (info) {
                    console.log('Informações do usuário encontradas no IndexedDB:', info);
                    
                    document.getElementById('name').value = info.nome || '';
                    document.getElementById('companyName').value = info.empresa || '';
                    document.getElementById('phone').value = info.telefone || '';
                    document.getElementById('email').value = info.email || '';
                    document.getElementById('address').value = info.endereco || '';
                    document.getElementById('cpfCnpj').value = info.cpfCnpj || '';

                    if (info.logo) {
                        const logoPreview = document.getElementById('logoPreview');
                        logoPreview.src = info.logo;
                        logoPreview.style.display = 'block';
                    }

                    if (info.cores) {
                        document.getElementById('primaryColorPreview').style.backgroundColor = info.cores.primaria;
                        document.getElementById('secondaryColorPreview').style.backgroundColor = info.cores.secundaria;
                        document.getElementById('primaryColor').value = info.cores.primaria;
                        document.getElementById('secondaryColor').value = info.cores.secundaria;
                    }
                } else {
                    console.log('Nenhuma informação de usuário encontrada no IndexedDB');
                }
            } catch (error) {
                console.error('Erro ao carregar informações do usuário:', error);
            }
        }

        // Função para limpar os campos do popupUsuario, se necessário
function limparCamposPopupUsuario() {
    document.getElementById('name').value = '';
    document.getElementById('companyName').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('address').value = '';
    document.getElementById('cpfCnpj').value = '';
    const logoPreview = document.getElementById('logoPreview');
    logoPreview.src = '';
    logoPreview.style.display = 'none';
    document.getElementById('primaryColorPreview').style.backgroundColor = '#0056b3';
    document.getElementById('secondaryColorPreview').style.backgroundColor = '#17a2b8';
    document.getElementById('primaryColor').value = '#0056b3';
    document.getElementById('secondaryColor').value = '#17a2b8';
}

// Função para fechar o popup de Cliente seguindo o padrão do popup de Usuário
function fecharPopupCliente() {
    const popupCliente = document.getElementById('popupCliente');
    if (popupCliente) {
        const modalContent = popupCliente.querySelector('div');
        modalContent.classList.add('scale-95');
        modalContent.classList.remove('scale-100');
        setTimeout(() => {
            popupCliente.classList.add('hidden');
        }, 300); // Tempo deve coincidir com a duração da transição
    }
}

//salvarInformacoesUsuari
async function salvarInformacoesUsuario() {
    const nome = document.getElementById('name').value;
    const empresa = document.getElementById('companyName').value;
    const telefone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const endereco = document.getElementById('address').value;
    const cpfCnpj = document.getElementById('cpfCnpj').value;
    const logoFile = document.getElementById('logo').files[0];
    const corPrimaria = document.getElementById('primaryColor').value;
    const corSecundaria = document.getElementById('secondaryColor').value;

    let logoUrl = '';
    if (logoFile) {
        logoUrl = await converterImagemParaBase64(logoFile);
    } else {
        const infoExistente = await obterInformacoesUsuarioDoIndexedDB();
        if (infoExistente && infoExistente.logo) {
            logoUrl = infoExistente.logo;
        }
    }

    try {
        // Recupera os dados existentes do usuário
        const existingInfo = await obterInformacoesUsuarioDoIndexedDB();

        // Mescla os novos dados com os dados existentes, preservando payment_methods
        const infoUsuario = {
            id: 'info', // Garantir que o id seja sempre 'info'
            ...existingInfo, // Preserva todos os campos existentes, incluindo payment_methods
            nome,
            empresa,
            telefone,
            email,
            endereco,
            cpfCnpj,
            logo: logoUrl,
            cores: {
                primaria: corPrimaria,
                secundaria: corSecundaria
            }
        };

        // Salva o objeto atualizado no IndexedDB
        await salvarInformacoesUsuarioNoIndexedDB(infoUsuario);
        fecharPopupUsuario();
        alert('Informações do usuário atualizadas com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar informações:', error);
        alert('Erro ao atualizar informações. Por favor, tente novamente.');
    }
}



        // Função para fechar o popupUsuario com animação
        function fecharPopupUsuario() {
    const popupUsuario = document.getElementById('popupUsuario');
    if (popupUsuario) {
        const modalContent = popupUsuario.querySelector('div');
        modalContent.classList.add('scale-95');
        modalContent.classList.remove('scale-100');
        setTimeout(() => {
            popupUsuario.classList.add('hidden');
        }, 300); // Tempo deve coincidir com a duração da transição
    }
}

        //abrirIndexedDB
        function converterImagemParaBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
                reader.readAsDataURL(file);
            });
        }

        async function abrirIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ClientesDB', 7);

        request.onerror = event => {
            console.error('Erro ao abrir o IndexedDB:', event);
            reject(event);
        };

        request.onsuccess = event => {
            resolve(event.target.result);
        };

        request.onupgradeneeded = event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('ambientes_personalizados')) {
                db.createObjectStore('ambientes_personalizados', { keyPath: 'nome' });
            }
            if (!db.objectStoreNames.contains('tipos_aplicacao_personalizados')) {
                db.createObjectStore('tipos_aplicacao_personalizados', { keyPath: 'nome' });
            }

            if (!db.objectStoreNames.contains('usuario')) {
                const usuarioStore = db.createObjectStore('usuario', { keyPath: 'id' });
                // Inicializar com um registro padrão se não existir
                usuarioStore.put({
                    id: 'info',
                    nome: '',
                    empresa: '',
                    telefone: '',
                    email: '',
                    endereco: '',
                    cpfCnpj: '',
                    logo: '',
                    cores: {
                        primaria: '#0056b3',
                        secundaria: '#17a2b8'
                    },
                    payment_methods: []
                });
            }
            if (!db.objectStoreNames.contains('clientes')) {
                db.createObjectStore('clientes', { keyPath: 'id', autoIncrement: true });
            }
            if (!db.objectStoreNames.contains('medidas')) {
                db.createObjectStore('medidas', { keyPath: 'cliente' });
            }
            if (!db.objectStoreNames.contains('verificacao')) {
                db.createObjectStore('verificacao', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('peliculas_personalizadas')) {
                db.createObjectStore('peliculas_personalizadas', { keyPath: 'nome' });
            }
        };
    });
}


        // Funções auxiliares que você já deve ter, mas incluídas aqui para completude
async function carregarAmbientesPersonalizadosDoIndexedDB() {
    const db = await abrirIndexedDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['ambientes_personalizados'], 'readonly');
        const store = transaction.objectStore('ambientes_personalizados');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function carregarTiposAplicacaoPersonalizadosDoIndexedDB() {
    const db = await abrirIndexedDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['tipos_aplicacao_personalizados'], 'readonly');
        const store = transaction.objectStore('tipos_aplicacao_personalizados');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}




        async function obterInformacoesUsuarioDoIndexedDB() {
            const db = await abrirIndexedDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(['usuario'], 'readonly');
                const objectStore = transaction.objectStore('usuario');
                const request = objectStore.get('info');

                request.onerror = event => {
                    console.error('Erro ao obter informações do usuário:', event);
                    reject(event);
                };

                request.onsuccess = event => {
                    resolve(event.target.result);
                };
            });
        }

        async function salvarInformacoesUsuarioNoIndexedDB(infoUsuario) {
            const db = await abrirIndexedDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(['usuario'], 'readwrite');
                const objectStore = transaction.objectStore('usuario');
                const request = objectStore.put(infoUsuario);

                request.onerror = event => {
                    console.error('Erro ao salvar no IndexedDB:', event);
                    reject(event);
                };

                request.onsuccess = event => {
                    resolve(event.target.result);
                };
            });
        }

        document.addEventListener('DOMContentLoaded', function () {
    // Função para inicializar dados assíncronos
    async function inicializarDados() {
        const ambientesPersonalizados = await carregarAmbientesPersonalizadosDoIndexedDB();
        const tiposAplicacaoPersonalizados = await carregarTiposAplicacaoPersonalizadosDoIndexedDB();

        ambientes = [...ambientes, ...ambientesPersonalizados.map(a => a.nome)];
        tiposAplicacao = [...tiposAplicacao, ...tiposAplicacaoPersonalizados.map(t => t.nome)];
    }

    // Inicializar dados assíncronos
    inicializarDados();

    // Adicionando evento para o botão de PDF da versão mobile
    const generatePdfButtonMobile = document.getElementById('generatePdfButtonMobile');
    if (generatePdfButtonMobile) {
        document.getElementById('generatePdfButtonMobile').addEventListener('click', generatePDF_v3_0);
    }

    const salvarInfoUsuarioBtn = document.getElementById('saveUserInfoButton');
    if (salvarInfoUsuarioBtn) {
        salvarInfoUsuarioBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Previne o envio do formulário
            salvarInformacoesUsuario();
        });
    }
    const salvarFormasPagamentoBtn = document.getElementById('paymentMethodsForm');
    if (salvarFormasPagamentoBtn) {
        document.getElementById('paymentMethodsForm').addEventListener('submit', salvarFormasPagamento);
        console.log('Listener de submit adicionado para paymentMethodsForm');
    }
    
    const popupClienteBtnSalvar = document.getElementById('popupClienteBtnSalvar');
    if (popupClienteBtnSalvar) {
        popupClienteBtnSalvar.addEventListener('click', salvarCliente);
    }

    const addNewClienteBtn = document.getElementById('addNewClienteBtn');
    const addNewClienteBtnDesktop = document.getElementById('addNewClienteBtnDesktop');

    if (addNewClienteBtn) {
        addNewClienteBtn.addEventListener('click', function () {
            abrirPopup('adicionar');
        });
    }

    if (addNewClienteBtnDesktop) {
        addNewClienteBtnDesktop.addEventListener('click', function () {
            abrirPopup('adicionar');
        });
    }

    const logoUsuario = document.getElementById('logo');
    if (logoUsuario) {
        logoUsuario.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const previewLogo = document.getElementById('logoPreview');
                    previewLogo.src = e.target.result;
                    previewLogo.style.display = 'block';
                }
                reader.readAsDataURL(file);
            }
        });
    }

    carregarClientes();
    document.getElementById('generatePdfButton').addEventListener('click', generatePDF_v3_0);
    const primaryColorPreview = document.getElementById('primaryColorPreview');
    const secondaryColorPreview = document.getElementById('secondaryColorPreview');
    const primaryColorInput = document.getElementById('primaryColor');
    const secondaryColorInput = document.getElementById('secondaryColor');

    primaryColorPreview.addEventListener('click', () => primaryColorInput.click());
    secondaryColorPreview.addEventListener('click', () => secondaryColorInput.click());

    primaryColorInput.addEventListener('change', (e) => {
        primaryColorPreview.style.backgroundColor = e.target.value;
    });

    secondaryColorInput.addEventListener('change', (e) => {
        secondaryColorPreview.style.backgroundColor = e.target.value;
    });

    carregarClientes();
    carregarPeliculasPersonalizadas();
            

    // Inicializar seletores dinâmicos para todos os grupos de medidas existentes
    const medidasContainer = document.getElementById('medidasContainer');
    if (medidasContainer) {
        const gruposMedidas = medidasContainer.querySelectorAll('.bg-white');
        gruposMedidas.forEach(grupo => {
            addDynamicSelectorsToMedidaGroup(grupo);
        });
    }
});
    // Event Listener para Adiantamento em Porcentagem
    const solicitarAdiantamentoCheckbox = document.getElementById('solicitar_adiantamento');
    const porcentagemAdiantamentoInput = document.getElementById('porcentagem_adiantamento');

    if (solicitarAdiantamentoCheckbox && porcentagemAdiantamentoInput) {
        solicitarAdiantamentoCheckbox.addEventListener('change', function() {
            if (this.checked) {
                porcentagemAdiantamentoInput.classList.remove('hidden');
            } else {
                porcentagemAdiantamentoInput.classList.add('hidden');
                porcentagemAdiantamentoInput.value = ''; // Limpar valor quando ocultar
            }
        });
    } else {
        console.error('Elementos de Adiantamento não encontrados.');
    }

    // Event Listener para Observação
    const adicionarObservacaoCheckbox = document.getElementById('adicionar_observacao');
    const observacaoDiv = document.getElementById('campo_observacao');
    const observacaoInput = document.getElementById('observacao');

    if (adicionarObservacaoCheckbox && observacaoDiv && observacaoInput) {
        adicionarObservacaoCheckbox.addEventListener('change', function() {
            if (this.checked) {
                observacaoDiv.classList.remove('hidden');
            } else {
                observacaoDiv.classList.add('hidden');
                observacaoInput.value = ''; // Limpar observação quando ocultar
            }
        });
    } else {
        console.error('Elementos de Observação não encontrados.');
    }

    // Listener para o Formulário de Formas de Pagamento
    const paymentMethodsForm = document.getElementById('paymentMethodsForm');
    if (paymentMethodsForm) {
        paymentMethodsForm.addEventListener('submit', salvarFormasPagamento);
        console.log('Listener de submit adicionado para paymentMethodsForm');
    } else {
        console.error('Elemento paymentMethodsForm não encontrado');
    }


        // ... [O código continua com as funções restantes]
        async function carregarDadosCliente(clienteId) {
    const cliente = await obterClienteDoIndexedDB(clienteId);
    if (cliente) {
        document.getElementById('popupClienteNome').value = cliente.nome;
        document.getElementById('popupClienteTelefone').value = cliente.telefone;
        document.getElementById('popupClienteEndereco').value = cliente.endereco;
        document.getElementById('popupClienteCpfCnpj').value = cliente.cpfCnpj; // Campo unificado
    }
}


        async function salvarCliente(event) {
    event.preventDefault();

    const nome = document.getElementById('popupClienteNome').value.trim();
    const telefone = document.getElementById('popupClienteTelefone').value.trim();
    const endereco = document.getElementById('popupClienteEndereco').value.trim();
    const cpfCnpj = document.getElementById('popupClienteCpfCnpj').value.trim(); // Novo campo unificado
    const email = document.getElementById('popupClienteEmail').value.trim(); // Campo de email

    const novoCliente = { nome, telefone, endereco, cpfCnpj, email }; // Inclui o email e o campo unificado

    try {
        let clienteId;
        if (clienteSelecionado) {
            await atualizarClienteNoIndexedDB(clienteSelecionado, novoCliente);
            clienteId = clienteSelecionado;
        } else {
            clienteId = await salvarClienteNoIndexedDB(novoCliente);
        }

        await carregarClientes(clienteId, true);
        fecharPopup();
        alert("Cliente salvo com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar cliente:", error);
        alert("Ocorreu um erro ao salvar o cliente. Por favor, tente novamente.");
    }
}



async function atualizarClienteNoIndexedDB(id, cliente) {
    const db = await abrirIndexedDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['clientes'], 'readwrite');
        const objectStore = transaction.objectStore('clientes');
        
        const getRequest = objectStore.get(parseInt(id));
        getRequest.onsuccess = (event) => {
            const existingCliente = event.target.result;
            if (existingCliente) {
                const updatedCliente = { ...existingCliente, ...cliente };
                const putRequest = objectStore.put(updatedCliente);
                putRequest.onsuccess = () => resolve();
                putRequest.onerror = (event) => reject(event);
            } else {
                reject(new Error("Cliente não encontrado"));
            }
        };
        getRequest.onerror = (event) => reject(event);
    });
}


async function obterClienteDoIndexedDB(id) {
    const db = await abrirIndexedDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['clientes'], 'readonly');
        const objectStore = transaction.objectStore('clientes');
        const request = objectStore.get(parseInt(id));

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
        request.onerror = (event) => {
            reject(event);
        };
    });
}


  

    // Função para fechar o popupCliente com animação
// Função para fechar o popupCliente com animação
function fecharPopup() {
    const popupCliente = document.getElementById('popupCliente');
    if (popupCliente) {
        const modalContent = popupCliente.querySelector('div');
        modalContent.classList.add('scale-95');
        modalContent.classList.remove('scale-100');
        setTimeout(() => {
            popupCliente.classList.add('hidden');
        }, 300); // Tempo deve coincidir com a duração da transição
    }
}

        function confirmClearMedidas() {
            if (confirm("Tem certeza que deseja apagar este cliente e suas medidas?")) {
                clearMedidas();
            }
        }

        async function clearMedidas() {
            const clienteId = clienteSelect.value;
            if (!clienteId) {
                alert('Selecione um cliente.');
                return;
            }

            await removerMedidasDoIndexedDB(clienteId);
            await removerClienteDoIndexedDB(clienteId);

            await carregarClientes();
            document.getElementById('medidasContainer').innerHTML = '';

            if (clientes.length > 0) {
                clienteSelect.value = clientes[0].id;
                loadMedidas();
            } else {
                clienteSelect.value = '';
            }

            calculateTotal();
        }

        // Atualizar a função saveMedidas para usar os novos seletores
async function saveMedidas() {
    const cliente = clienteSelect.value;
    if (!cliente) return;

    const medidaGroups = document.querySelectorAll('#medidasContainer > div');
    const medidas = Array.from(medidaGroups).map(group => ({
        largura: group.querySelector('.largura-input').value,
        altura: group.querySelector('.altura-input').value,
        quantidade: group.querySelector('.quantidade-input').value,
        ambiente: group.querySelector('.additional-fields input[placeholder="Selecione ou digite o ambiente"]').value,
        tipoAplicacao: group.querySelector('.additional-fields input[placeholder="Selecione ou digite o tipo de aplicação"]').value,
        pelicula: group.querySelector('.pelicula-select').value
    }));

    await salvarMedidasNoIndexedDB(cliente, medidas);
}

        async function loadMedidas() {
            const cliente = clienteSelect.value;
            const savedMedidas = await obterMedidasDoIndexedDB(cliente);
            const medidasContainer = document.getElementById('medidasContainer');
            medidasContainer.innerHTML = '';

            if (savedMedidas) {
                savedMedidas.forEach(medida => {
                    addMedidaGroup(false, medida.largura, medida.altura, medida.quantidade, true, medida.ambiente, medida.tipoAplicacao, medida.pelicula);
                });
            } else {
                addMedidaGroup(true);
            }
            calculateTotal();
        }



      // Função para normalizar o texto (para comparações case-insensitive)
function normalizeText(text) {
    return text.toLowerCase().trim();
}

// Função para normalizar "banheiro"
function normalizeBanheiro(value) {
    return normalizeText(value) === 'banheiro' ? 'Banheiro' : value;
}

// Função para criar um seletor dinâmico
function createDynamicSelector(type, options, placeholder) {
    const container = document.createElement('div');
    container.className = 'relative w-full';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'w-full p-2 border border-gray-300 rounded-md';
    input.placeholder = placeholder;

    const dropdown = document.createElement('ul');
    dropdown.className = 'absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto hidden';

    container.appendChild(input);
    container.appendChild(dropdown);

    let currentOptions = options;

    input.addEventListener('input', function() {
        const value = this.value.trim();
        updateDropdown(value, type);
    });

    input.addEventListener('focus', function() {
        updateDropdown(this.value.trim(), type);
    });

    function updateDropdown(value, type) {
        dropdown.innerHTML = '';
        dropdown.classList.remove('hidden');

        const normalizedValue = normalizeText(value);
        const filteredOptions = currentOptions.filter(option => 
            normalizeText(option).includes(normalizedValue)
        );

        if (filteredOptions.length === 0 && value) {
            const listItem = document.createElement('li');
            listItem.textContent = `Adicionar "${normalizeBanheiro(value)}"`;
            listItem.className = 'p-2 hover:bg-gray-100 cursor-pointer';
            listItem.addEventListener('click', async () => {
                const normalizedNewValue = normalizeBanheiro(value);
                if (!currentOptions.some(opt => normalizeText(opt) === normalizeText(normalizedNewValue))) {
                    await saveNewOption(type, normalizedNewValue);
                    currentOptions.push(normalizedNewValue);
                }
                input.value = normalizedNewValue;
                dropdown.classList.add('hidden');
                calculateTotal(); // Atualiza o total após adicionar nova opção
            });
            dropdown.appendChild(listItem);
        } else {
            filteredOptions.forEach(option => {
                const listItem = document.createElement('li');
                listItem.textContent = option;
                listItem.className = 'p-2 hover:bg-gray-100 cursor-pointer';
                listItem.addEventListener('click', () => {
                    input.value = option;
                    dropdown.classList.add('hidden');
                    calculateTotal(); // Atualiza o total após selecionar uma opção
                });
                dropdown.appendChild(listItem);
            });
        }
    }

    document.addEventListener('click', function(event) {
        if (!container.contains(event.target)) {
            dropdown.classList.add('hidden');
        }
    });

    return container;
}

// Função para salvar nova opção no IndexedDB
async function saveNewOption(type, value) {
    const db = await abrirIndexedDB();
    const transaction = db.transaction([`${type}_personalizados`], 'readwrite');
const store = transaction.objectStore(`${type}_personalizados`);

    await store.put({ nome: value });
}

// Função para adicionar os seletores dinâmicos ao grupo de medidas
function addDynamicSelectorsToMedidaGroup(group) {
    const additionalFields = group.querySelector('.additional-fields');
    additionalFields.innerHTML = ''; // Limpa os campos existentes

    const ambienteSelector = createDynamicSelector('ambientes', ambientes, 'Selecione ou digite o ambiente');
    const tipoAplicacaoSelector = createDynamicSelector('tipos_aplicacao', tiposAplicacao, 'Selecione ou digite o tipo de aplicação');

    additionalFields.appendChild(ambienteSelector);
    additionalFields.appendChild(tipoAplicacaoSelector);
}




// Atualizar a função addMedidaGroup para usar os novos seletores dinâmicos
function addMedidaGroup(isFirst, largura = '', altura = '', quantidade = 1, isChecked = true, ambiente = '', tipoAplicacao = '', peliculaSelecionada = '') {
    console.log("Adicionando novo grupo de medidas");
    const container = document.getElementById('medidasContainer');
    const medidaGroup = document.createElement('div');
    medidaGroup.classList.add('bg-white', 'shadow-md', 'rounded-lg', 'p-2', 'space-y-2');

    const isZebra = container.children.length % 2 === 0;
    const zebraClass = isZebra ? 'bg-gray-300' : 'bg-white';

    medidaGroup.classList.add(zebraClass, 'shadow-md', 'rounded-lg', 'p-2', 'space-y-2', 'mb-2');

    console.log("Películas disponíveis para o seletor:", peliculas);

    medidaGroup.innerHTML = 
        `<div class="flex items-center space-x-1">
            <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleInputs(this)" class="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-0">
            <input type="number" placeholder="L" value="${largura}" class="w-1/4 p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 largura-input" oninput="atualizarTotal(this)" maxlength="3">
            <input type="number" placeholder="A" value="${altura}" class="w-1/4 p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 altura-input" oninput="atualizarTotal(this)" maxlength="3">
            <input type="number" placeholder="Q" value="${quantidade}" class="w-1/4 p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 quantidade-input" oninput="atualizarTotal(this)" maxlength="3">
            <input type="text" placeholder="M²" disabled class="w-1/4 p-1 border border-gray-300 rounded-md bg-gray-100 text-gray-600">
        </div>
        <div class="flex items-center space-x-1">
            <select class="flex-grow min-w-0 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 pelicula-select" onchange="onPeliculaChange(this)">
                ${peliculas.map(p => `<option value="${p.nome}" ${p.nome === peliculaSelecionada ? 'selected' : ''}>${p.nome}</option>`).join('')}
                <option value="Outra">Outra</option>
            </select>
            <!-- Botão para editar a película -->
            <button onclick="editarPelicula(this)" class="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400" aria-label="Editar Película">
                <i class="fas fa-edit fa-lg text-purple-500"></i>
            </button>
            <button class="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300 shadow-md flex-shrink-0 w-8 h-8 flex items-center justify-center" onclick="duplicarGrupo(this)" aria-label="Duplicar Grupo de Medidas">
                <i class="fas fa-copy text-green-500"></i>
            </button>
            <button class="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300 shadow-md flex-shrink-0 w-8 h-8 flex items-center justify-center" onclick="toggleAdditionalFields(this)" aria-label="Toggle Campos Adicionais">
                <i class="fas fa-eye text-blue-500"></i>
            </button>
            <button class="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300 shadow-md flex-shrink-0 w-8 h-8 flex items-center justify-center delete-button" onclick="deleteMedidaGroup(this)" style="display: ${isChecked ? 'none' : 'flex'};" aria-label="Excluir Grupo de Medidas">
                <i class="fas fa-trash-alt text-red-500"></i>
            </button>
        </div>
        <div class="additional-fields hidden mt-2">
            <!-- Seletor Dinâmico de Ambiente -->
            <div class="mb-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ambiente</label>
                <input type="text" placeholder="Selecione ou digite o ambiente" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-100">
            </div>
            <!-- Seletor Dinâmico de Tipo de Aplicação -->
            <div class="mb-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de Aplicação</label>
                <input type="text" placeholder="Selecione ou digite o tipo de aplicação" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-100">
            </div>
        </div>`;

    container.insertBefore(medidaGroup, container.firstChild);

    const additionalFields = medidaGroup.querySelector('.additional-fields');
    addDynamicSelectorsToMedidaGroup(medidaGroup);

    // Definir valores para os seletores dinâmicos
    if (ambiente) {
        const ambienteInput = additionalFields.querySelector('input[placeholder="Selecione ou digite o ambiente"]');
        if (ambienteInput) {
            ambienteInput.value = ambiente;
            const event = new Event('input', { bubbles: true });
            ambienteInput.dispatchEvent(event);
        }
    }
    if (tipoAplicacao) {
        const tipoAplicacaoInput = additionalFields.querySelector('input[placeholder="Selecione ou digite o tipo de aplicação"]');
        if (tipoAplicacaoInput) {
            tipoAplicacaoInput.value = tipoAplicacao;
            const event = new Event('input', { bubbles: true });
            tipoAplicacaoInput.dispatchEvent(event);
        }
    }

    const larguraInput = medidaGroup.querySelector('.largura-input');
    const alturaInput = medidaGroup.querySelector('.altura-input');
    const quantidadeInput = medidaGroup.querySelector('.quantidade-input');

    larguraInput.addEventListener('input', function () {
        if (larguraInput.value.length >= 4) {
            alturaInput.focus();
        }
    });

    alturaInput.addEventListener('input', function () {
        if (alturaInput.value.length >= 4) {
            quantidadeInput.focus();
            setTimeout(() => {
                const length = quantidadeInput.value.length;
                quantidadeInput.setSelectionRange(length, length);
            }, 0);
        }
    });

    if (isFirst) {
        larguraInput.focus();
    }

    calculateTotal();
    console.log("Grupo de medidas adicionado com sucesso");
}


//editarPelicula
function editarPelicula(button) {
    // Obter o grupo de medidas correspondente
    const medidaGroup = button.closest('.bg-white');
    if (!medidaGroup) {
        console.error("Grupo de medidas não encontrado para editar a película.");
        return;
    }

    // Obter o seletor de película dentro do grupo de medidas
    const peliculaSelect = medidaGroup.querySelector('.pelicula-select');
    if (!peliculaSelect) {
        console.error("Seletor de película não encontrado no grupo de medidas.");
        return;
    }

    // Armazena a referência do seletor atual para atualização posterior
    currentSelectForPelicula = peliculaSelect;

    // Obter o nome da película selecionada
    const peliculaNome = peliculaSelect.value;

    // Obter a película dos dados predefinidos ou personalizados
    let pelicula = peliculas.find(p => p.nome === peliculaNome);
    if (!pelicula) {
        const peliculasPersonalizadas = peliculas.filter(p => !peliculasPredefinidas.some(pp => pp.nome === p.nome));
        pelicula = peliculasPersonalizadas.find(p => p.nome === peliculaNome);
    }

    if (!pelicula) {
        alert("Película selecionada não encontrada.");
        return;
    }

    // Abrir o popup com os dados da película para edição
    abrirPopupPeliculaPersonalizada(pelicula);
}



       //function atualizarTotal
        function atualizarTotal(input) {
    const group = input.closest('.bg-white');
    const largura = parseFloat(group.querySelector('.largura-input').value) || 0;
    const altura = parseFloat(group.querySelector('.altura-input').value) || 0;
    const quantidade = parseInt(group.querySelector('.quantidade-input').value) || 0;
    const totalM2 = largura * altura * quantidade;

    group.querySelector('input[placeholder="M²"]').value = totalM2.toFixed(2);
    calculateTotal();
}

      // Função para duplicar um grupo de medidas
function duplicarGrupo(button) {
    const group = button.closest('.bg-white');
    const largura = group.querySelector('.largura-input').value || '';
    const altura = group.querySelector('.altura-input').value || '';
    const quantidade = group.querySelector('.quantidade-input').value || '';
    const ambiente = group.querySelector('.additional-fields input[placeholder="Selecione ou digite o ambiente"]').value || '';
    const tipoAplicacao = group.querySelector('.additional-fields input[placeholder="Selecione ou digite o tipo de aplicação"]').value || '';
    const peliculaSelecionada = group.querySelector('.pelicula-select').value || '';

    addMedidaGroup(true, largura, altura, quantidade, true, ambiente, tipoAplicacao, peliculaSelecionada);

    const container = document.getElementById('medidasContainer');
    const firstGroup = container.firstChild;
    const larguraInput = firstGroup.querySelector('.largura-input');
    larguraInput.focus();

    calculateTotal();
}

   // Função para duplicar todas as medidas
function duplicarMedidas() {
    const medidaGroups = Array.from(document.querySelectorAll('#medidasContainer > div'));

    medidaGroups.reverse().forEach(group => {
        const largura = group.querySelector('.largura-input').value || '';
        const altura = group.querySelector('.altura-input').value || '';
        const quantidade = group.querySelector('.quantidade-input').value || '';
        const ambiente = group.querySelector('.additional-fields input[placeholder="Selecione ou digite o ambiente"]').value || '';
        const tipoAplicacao = group.querySelector('.additional-fields input[placeholder="Selecione ou digite o tipo de aplicação"]').value || '';
        const peliculaSelecionada = group.querySelector('.pelicula-select').value || '';

        addMedidaGroup(false, largura, altura, quantidade, true, ambiente, tipoAplicacao, peliculaSelecionada);
    });

    const container = document.getElementById('medidasContainer');
    const firstGroup = container.firstChild;
    const larguraInput = firstGroup.querySelector('.largura-input');
    larguraInput.focus();

    calculateTotal();
}

        function deleteMedidaGroup(button) {
            if (confirm('Tem certeza que deseja excluir este grupo de medidas?')) {
                button.closest('.bg-white').remove();
                calculateTotal();
                saveMedidas();
            }
        }

        async function calculateTotal() {
            const medidaGroups = document.querySelectorAll('#medidasContainer > div');
            let totalM2 = 0;
            let precoTotal = 0;

            for (const group of medidaGroups) {
                const isChecked = group.querySelector('input[type="checkbox"]').checked;
                const largura = parseFloat(group.querySelector('.largura-input').value) || 0;
                const altura = parseFloat(group.querySelector('.altura-input').value) || 0;
                const quantidade = parseInt(group.querySelector('.quantidade-input').value) || 0;

                if (isChecked && largura > 0 && altura > 0 && quantidade > 0) {
                    const peliculaNome = group.querySelector('.pelicula-select').value;
                    let pelicula = peliculas.find(p => p.nome === peliculaNome);
                    
                    if (!pelicula) {
                        const peliculasPersonalizadas = await carregarPeliculasPersonalizadasDoIndexedDB();
                        pelicula = peliculasPersonalizadas.find(p => p.nome === peliculaNome);
                    }

                    const area = largura * altura * quantidade; // Convertendo para m²
                    const preco = pelicula ? area * pelicula.preco : 0;

                    totalM2 += area;
                    precoTotal += preco;

                    group.querySelector('input[placeholder="M²"]').value = area.toFixed(2);
                } else {
                    group.querySelector('input[placeholder="M²"]').value = '0.00';
                }
            }

            updateResultado(totalM2, precoTotal);
            await saveMedidas();
        }

        function toggleAdditionalFields(button) {
            const fields = button.closest('.bg-white').querySelector('.additional-fields');
            if (fields.classList.contains('hidden')) {
                fields.classList.remove('hidden');
                button.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                fields.classList.add('hidden');
                button.innerHTML = '<i class="fas fa-eye"></i>';
            }
        }
//toggleInputs 
function toggleInputs(checkbox) {
    const medidaGroup = checkbox.closest('.bg-white');
    const inputs = medidaGroup.querySelectorAll('input, select');
    inputs.forEach(input => {
        if (input !== checkbox) {
            input.disabled = !checkbox.checked;
        }
    });
    
    // Seleciona o botão de excluir dentro do grupo de medidas usando a classe específica
    const deleteButton = medidaGroup.querySelector('.delete-button');
    if (deleteButton) {
        // Mostrar o botão de excluir apenas se o checkbox não estiver marcado
        deleteButton.style.display = checkbox.checked ? 'none' : 'flex';
    }

    calculateTotal();
}



        function copyShareURL() {
            const cliente = clienteSelect.value;
            if (!cliente) {
                alert('Selecione um cliente.');
                return;
            }

            const url = new URL(window.location.href);
            url.searchParams.set('cliente', cliente);
            const shareURL = url.toString();

            navigator.clipboard.writeText(shareURL).then(() => {
                alert('URL copiada para a área de transferência!');
            }, (err) => {
                console.error('Erro ao copiar a URL: ', err);
            });
        }




        // Funções para películas personalizadas
        function abrirPopupPeliculaPersonalizada(pelicula = null) {
    const popupHTML = `
        <div id="popupPeliculaPersonalizada" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out max-w-md w-full mx-4 sm:mx-0">
                <!-- Cabeçalho do Popup -->
                <div class="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">${pelicula ? 'Editar Película' : 'Adicionar Película Personalizada'}</h2>
                    <button onclick="fecharPopupPeliculaPersonalizada()" class="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <!-- Corpo do Popup -->
                <form id="peliculaForm" class="p-6 space-y-4">
                    <!-- Campos do formulário -->
                    <div>
                        <label for="nomePeliculaPersonalizada" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome da Película</label>
                        <input type="text" id="nomePeliculaPersonalizada" class="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100" placeholder="Nome da Película" required value="${pelicula ? pelicula.nome : ''}">
                    </div>
                    <div>
                        <label for="precoPeliculaPersonalizada" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Preço por m² (R$)</label>
                        <input type="number" id="precoPeliculaPersonalizada" class="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100" placeholder="Preço por m²" min="0" step="0.01" required value="${pelicula ? pelicula.preco : ''}">
                    </div>
                    <div>
                        <label for="garantiaFabricante" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Garantia Fabricante (Anos)</label>
                        <select id="garantiaFabricante" class="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100" required>
                            <option value="" disabled ${pelicula ? '' : 'selected'}>Selecione a garantia fabricante</option>
                            <option value="0" ${pelicula && pelicula.garantiaFabricante === 0 ? 'selected' : ''}>0</option>
                            <option value="1" ${pelicula && pelicula.garantiaFabricante === 1 ? 'selected' : ''}>1</option>
                            <option value="2" ${pelicula && pelicula.garantiaFabricante === 2 ? 'selected' : ''}>2</option>
                            <option value="3" ${pelicula && pelicula.garantiaFabricante === 3 ? 'selected' : ''}>3</option>
                            <option value="5" ${pelicula && pelicula.garantiaFabricante === 5 ? 'selected' : ''}>5</option>
                            <option value="7" ${pelicula && pelicula.garantiaFabricante === 7 ? 'selected' : ''}>7</option>
                            <option value="10" ${pelicula && pelicula.garantiaFabricante === 10 ? 'selected' : ''}>10</option>
                            <option value="15" ${pelicula && pelicula.garantiaFabricante === 15 ? 'selected' : ''}>15</option>
                        </select>
                    </div>
                    <div>
                        <label for="garantiaMaoDeObra" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Garantia Mão de Obra (Inicia em Dias)</label>
                        <select id="garantiaMaoDeObra" class="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100" required>
                            <option value="" disabled ${pelicula ? '' : 'selected'}>Selecione a garantia mão de obra</option>
                            <option value="30" ${pelicula && pelicula.garantiaMaoDeObra === 30 ? 'selected' : ''}>Inicia em 30 dias</option>
                            <option value="60" ${pelicula && pelicula.garantiaMaoDeObra === 60 ? 'selected' : ''}>Inicia em 60 dias</option>
                            <option value="90" ${pelicula && pelicula.garantiaMaoDeObra === 90 ? 'selected' : ''}>Inicia em 90 dias</option>
                            <option value="120" ${pelicula && pelicula.garantiaMaoDeObra === 120 ? 'selected' : ''}>Inicia em 120 dias</option>
                            <option value="180" ${pelicula && pelicula.garantiaMaoDeObra === 180 ? 'selected' : ''}>Inicia em 180 dias</option>
                            <option value="360" ${pelicula && pelicula.garantiaMaoDeObra === 360 ? 'selected' : ''}>Inicia em 360 dias</option>
                        </select>
                    </div>
                </form>
                <!-- Rodapé do Popup com Botões -->
                <div class="flex justify-end items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 space-x-4">
                    ${pelicula ? 
                        `<button 
                            id="deletePeliculaButton" 
                            class="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 shadow-md flex items-center justify-center" 
                            onclick="deletarPeliculaPersonalizada('${pelicula.nome}')"
                            aria-label="Excluir Película"
                        >
                            <i class="fas fa-trash-alt fa-lg"></i>
                            <span class="ml-2">Excluir</span>
                        </button>` : ''}
                    <button 
                        id="salvarPeliculaPersonalizada" 
                        type="submit" 
                        form="peliculaForm" 
                        class="flex-grow px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 shadow-md flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <span>${pelicula ? 'Salvar Alterações' : 'Salvar Película'}</span>
                    </button>
                    <button 
                        onclick="fecharPopupPeliculaPersonalizada()" 
                        class="p-2 bg-gray-200 text-gray-500 rounded-md hover:bg-gray-300 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                        aria-label="Cancelar"
                    >
                        <i class="fas fa-times fa-lg"></i>
                    </button>
                </div>
            </div>
        </div>`;
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // Adiciona o event listener ao formulário para capturar o evento de submissão
    document.getElementById('peliculaForm').addEventListener('submit', function(event) {
        salvarPeliculaPersonalizada(event, pelicula);
    });

    // Se estiver no modo de edição, ajustar a referência para a película atual
    if (pelicula) {
        currentEditPelicula = pelicula;
    }
}



        function fecharPopupPeliculaPersonalizada() {
            const popup = document.getElementById('popupPeliculaPersonalizada');
            if (popup) {
                popup.remove();
            }
        }

       //SALVAR PELICULAS
       async function salvarPeliculaPersonalizada(event, peliculaEditada = null) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const nome = document.getElementById('nomePeliculaPersonalizada').value.trim();
    const preco = parseFloat(document.getElementById('precoPeliculaPersonalizada').value);
    const garantiaFabricante = parseInt(document.getElementById('garantiaFabricante').value);
    const garantiaMaoDeObra = parseInt(document.getElementById('garantiaMaoDeObra').value);

    // Validações
    if (!nome) {
        alert('Por favor, insira o nome da película.');
        return;
    }

    if (isNaN(preco) || preco < 0) {
        alert('Por favor, insira um preço válido.');
        return;
    }

    if (isNaN(garantiaFabricante)) {
        alert('Por favor, selecione uma garantia fabricante.');
        return;
    }

    if (isNaN(garantiaMaoDeObra)) {
        alert('Por favor, selecione uma garantia mão de obra.');
        return;
    }

    const novaPelicula = { 
        nome, 
        preco, 
        garantiaFabricante, 
        garantiaMaoDeObra 
    };

    try {
        let nomeOriginal = null;
        if (peliculaEditada) {
            nomeOriginal = peliculaEditada.nome;
            // Atualizar a película existente
            await atualizarPeliculaPersonalizadaNoIndexedDB(nomeOriginal, novaPelicula);
            alert('Película atualizada com sucesso!');
        } else {
            // Salvar uma nova película
            await salvarPeliculaPersonalizadaNoIndexedDB(novaPelicula);
            alert('Película personalizada salva com sucesso!');
        }

        fecharPopupPeliculaPersonalizada();

        // Atualizar os seletores de películas
        await atualizarSeletoresPeliculas();

        // Atualizar todos os seletores que tinham o nome original para o novo nome
        if (nomeOriginal && nomeOriginal !== nome) {
            const seletores = document.querySelectorAll('.pelicula-select');
            seletores.forEach(seletor => {
                if (seletor.value === nomeOriginal) {
                    seletor.value = nome;
                }
            });
        }

        // Atualizar o seletor que iniciou a ação para a nova película
        if (currentSelectForPelicula) {
            currentSelectForPelicula.value = nome;
            currentSelectForPelicula = null; // Limpar a referência após atualização
        }

        calculateTotal();
    } catch (error) {
        console.error('Erro ao salvar película personalizada:', error);
        alert('Ocorreu um erro ao salvar a película personalizada. Por favor, tente novamente.');
    }
}






//atualizarPeliculaPersonalizadaNoIndexedDB
async function atualizarPeliculaPersonalizadaNoIndexedDB(nomeOriginal, peliculaAtualizada) {
    const db = await abrirIndexedDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['peliculas_personalizadas'], 'readwrite');
        const store = transaction.objectStore('peliculas_personalizadas');
        
        if (nomeOriginal !== peliculaAtualizada.nome) {
            // Remove a película antiga se o nome foi alterado
            const deleteRequest = store.delete(nomeOriginal);
            deleteRequest.onsuccess = () => {
                // Adiciona a película atualizada
                const putRequest = store.put(peliculaAtualizada);
                putRequest.onsuccess = () => resolve();
                putRequest.onerror = (event) => reject(event);
            };
            deleteRequest.onerror = (event) => reject(event);
        } else {
            // Se o nome não mudou, apenas atualiza os outros campos
            const putRequest = store.put(peliculaAtualizada);
            putRequest.onsuccess = () => resolve();
            putRequest.onerror = (event) => reject(event);
        }
    });
}



//salvarPeliculaPersonalizadaNoIndexedDB:
async function salvarPeliculaPersonalizadaNoIndexedDB(pelicula) {
    const db = await abrirIndexedDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['peliculas_personalizadas'], 'readwrite');
        const store = transaction.objectStore('peliculas_personalizadas');
        const request = store.put(pelicula);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}


//carregarPeliculasPersonalizadasDoIndexedDB
async function carregarPeliculasPersonalizadasDoIndexedDB() {
    const db = await abrirIndexedDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['peliculas_personalizadas'], 'readonly');
        const store = transaction.objectStore('peliculas_personalizadas');
        const request = store.getAll();

        request.onsuccess = () => {
            console.log('Películas carregadas:', request.result);
            resolve(request.result);
        };
        request.onerror = () => {
            console.error('Erro ao carregar películas personalizadas:', request.error);
            reject(request.error);
        };
    });
}



//deletarPeliculaPersonalizada
async function deletarPeliculaPersonalizada(nomePelicula) {
    if (!confirm("Tem certeza que deseja excluir esta película? Esta ação não pode ser desfeita.")) {
        return;
    }

    try {
        await removerPeliculaPersonalizadaDoIndexedDB(nomePelicula);
        alert('Película excluída com sucesso!');
        fecharPopupPeliculaPersonalizada();
        await atualizarSeletoresPeliculas(); // Atualização após exclusão
        calculateTotal();
    } catch (error) {
        console.error('Erro ao excluir película:', error);
        alert('Ocorreu um erro ao excluir a película. Por favor, tente novamente.');
    }
}



//removerPeliculaPersonalizadaDoIndexedDB
async function removerPeliculaPersonalizadaDoIndexedDB(nomePelicula) {
    const db = await abrirIndexedDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['peliculas_personalizadas'], 'readwrite');
        const store = transaction.objectStore('peliculas_personalizadas');
        const request = store.delete(nomePelicula);

        request.onsuccess = () => resolve();
        request.onerror = (event) => reject(event);
    });
}


// atualizarSeletoresPeliculas
async function atualizarSeletoresPeliculas() {
    const peliculasPersonalizadas = await carregarPeliculasPersonalizadasDoIndexedDB();
    peliculas = [...peliculasPredefinidas, ...peliculasPersonalizadas]; // Inclui predefinidas e personalizadas

    console.log('Array de películas atualizado:', peliculas);

    // Atualizar todos os seletores
    const seletores = document.querySelectorAll('.pelicula-select');
    seletores.forEach(seletor => {
        const valorSelecionado = seletor.value;
        seletor.innerHTML = peliculas.map(p => `<option value="${p.nome}">${p.nome}</option>`).join('') + '<option value="Outra">Outra</option>';

        // Retentar selecionar o valor anterior se ainda existir
        if (peliculas.some(p => p.nome === valorSelecionado)) {
            seletor.value = valorSelecionado;
        } else {
            seletor.value = 'Outra';
        }
    });
}



    
function onPeliculaChange(select) {
    if (select.value === 'Outra') {
        currentSelectForPelicula = select; // Armazena a referência do <select>
        abrirPopupPeliculaPersonalizada();
    }
    calculateTotal();
}



//carregarPeliculasPersonalizadas
async function carregarPeliculasPersonalizadas() {
    const peliculasPersonalizadas = await carregarPeliculasPersonalizadasDoIndexedDB();
    peliculas = [...peliculasPredefinidas, ...peliculasPersonalizadas];
    await atualizarSeletoresPeliculas();
}

        // Sistema de verificação do aplicativo
        const DURACAO_TESTE_GRATIS = 30 * 24 * 60 * 60 * 1000; // 30 dias em milissegundos

        async function verificarStatusAplicativo() {
            const db = await abrirIndexedDB();
            const transaction = db.transaction(['verificacao'], 'readonly');
            const objectStore = transaction.objectStore('verificacao');
            const request = objectStore.get('status');

            return new Promise((resolve) => {
                request.onsuccess = event => {
                    const result = event.target.result;
                    if (result) {
                        if (result.ativado) {
                            resolve({ status: 'ativado' });
                        } else if (result.inicioTeste) {
                            const agora = new Date().getTime();
                            const fimTeste = new Date(result.inicioTeste).getTime() + DURACAO_TESTE_GRATIS;
                            if (agora < fimTeste) {
                                resolve({ status: 'em_teste', diasRestantes: Math.ceil((fimTeste - agora) / (24 * 60 * 60 * 1000)) });
                            } else {
                                resolve({ status: 'expirado' });
                            }
                        } else {
                            resolve({ status: 'novo' });
                        }
                    } else {
                        resolve({ status: 'novo' });
                    }
                };
                request.onerror = () => resolve({ status: 'erro' });
            });
        }

        async function resetarStatusTeste() {
            const db = await abrirIndexedDB();
            const transaction = db.transaction(['verificacao'], 'readwrite');
            const objectStore = transaction.objectStore('verificacao');
            await objectStore.put({ id: 'status', ativado: false, inicioTeste: null });
            console.log("Status do teste resetado. Recarregue a página para iniciar um novo teste.");
        }

        async function iniciarTesteGratis() {
            const db = await abrirIndexedDB();
            const transaction = db.transaction(['verificacao'], 'readwrite');
            const objectStore = transaction.objectStore('verificacao');
            await objectStore.put({ id: 'status', ativado: false, inicioTeste: new Date().toISOString() });
        }

     // Função ativarAplicativo permanece a mesma
async function ativarAplicativo() {
    console.log('Iniciando ativarAplicativo()');
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ClientesDB', 7);
        
        request.onerror = (event) => {
            console.error('Erro ao abrir o IndexedDB:', event.target.error);
            reject('Erro ao abrir o IndexedDB');
        };
        
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['verificacao'], 'readwrite');
            const store = transaction.objectStore('verificacao');
            
            const putRequest = store.put({ id: 'status', ativado: true });
            
            putRequest.onerror = (event) => {
                console.error('Erro ao salvar status de ativação:', event.target.error);
                reject('Erro ao salvar status de ativação');
            };
            
            putRequest.onsuccess = () => {
                console.log('Status de ativação salvo com sucesso');
                resolve(true);
            };
        };
        
        request.onupgradeneeded = (event) => {
            console.log('Atualizando estrutura do banco de dados');
            const db = event.target.result;
            if (!db.objectStoreNames.contains('verificacao')) {
                db.createObjectStore('verificacao', { keyPath: 'id' });
            }
        };
    });
}

        function gerarFrasesAleatorias() {
            const frases = [];
            for (let i = 0; i < 7; i++) {
                const tamanho = Math.floor(Math.random() * 4) + 5;
                let frase = '';
                for (let j = 0; j < tamanho; j++) {
                    frase += String.fromCharCode(Math.floor(Math.random() * 94) + 33);
                }
                frases.push(frase);
            }
            return frases;
        }

        function extrairCodigoAtivacao(frases) {
            let codigo = '';

            let seq1 = frases[0][frases[0].length - 2];
            if (seq1.match(/[a-zA-Z]/)) seq1 = frases[0][0] + seq1;
            codigo += seq1;

            let seq2 = frases[1][1];
            if (seq2.match(/[^a-zA-Z0-9]/) || seq2.match(/[a-z]/)) seq2 = frases[1][2] || '';
            codigo += seq2;

            let seq3 = frases[2][0];
            if (seq3.match(/[0-9]/)) seq3 += frases[2][1] || '';
            codigo += seq3;

            let seq4 = frases[3][frases[3].length - 1];
            if (seq4.match(/[0-9]/)) seq4 = frases[3][frases[3].length - 2] || '';
            codigo += seq4;

            let seq5 = frases[4][1];
            if (seq5.match(/[a-zA-Z]/)) seq5 += frases[4][2] || '';
            codigo += seq5;

            let seq6 = frases[5][4] || '';
            if (seq6.match(/[^a-zA-Z0-9]/)) seq6 = frases[5][0] || '';
            codigo += seq6;

            let seq7 = frases[6][3] || '';
            if (seq7.match(/[A-Z]/)) seq7 += frases[6][frases[6].length - 1] || '';
            codigo += seq7;

            return codigo;
        }

        function verificarCodigo(codigoUsuario, frasesOriginais) {
            const codigoCorreto = extrairCodigoAtivacao(frasesOriginais);

            if (codigoUsuario === '987410') {
                return true;
            }

            return codigoUsuario === codigoCorreto;
        }

        async function mostrarPopupVerificacao() {
            // Remover qualquer popup existente antes de criar um novo
            const existingPopup = document.getElementById('popupVerificacao');
            if (existingPopup) {
                existingPopup.parentNode.removeChild(existingPopup);
            }
            const frasesGeradas = gerarFrasesAleatorias();
            const codigoCorreto = extrairCodigoAtivacao(frasesGeradas);

            const popupHTML = `
                <div id="popupVerificacao" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style="z-index: 9999;">
                    <div class="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full">
                        <h2 class="text-xl font-semibold mb-4 text-gray-800">Acesso Bloqueado</h2>
                        <p>Para usar o aplicativo, por favor, ative-o enviando as seguintes frases para o WhatsApp +5583993015765:</p>
                        <ol class="list-decimal list-inside mb-4">
                            ${frasesGeradas.map(frase => `<li>${frase}</li>`).join('')}
                        </ol>
                        <input type="text" id="codigoAtivacao" class="w-full p-2 border border-gray-300 rounded-md mb-4" placeholder="Insira o código de ativação">
<button id="verificarCodigo" class="w-full p-3 bg-blue-500 text-white rounded-md flex items-center justify-center">
    <i class="fas fa-dollar-sign fa-lg"></i>
    <span class="ml-2">Ativar Aplicativo</span>
</button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', popupHTML);

            document.getElementById('verificarCodigo').addEventListener('click', async () => {
    console.log('Botão de verificação clicado');
    const codigoUsuario = document.getElementById('codigoAtivacao').value;
    console.log('Código inserido:', codigoUsuario);

    // Verifica se é a senha alternativa ou o código gerado
    if (codigoUsuario === '987410' || verificarCodigo(codigoUsuario, frasesGeradas)) {
        console.log('Código correto ou senha alternativa válida, tentando ativar o aplicativo');
        try {
            const resultado = await ativarAplicativo();
            console.log('Resultado da ativação:', resultado);
            
            if (resultado) {
                console.log('Aplicativo ativado com sucesso, tentando fechar o popup');
                const popup = document.getElementById('popupVerificacao');
                if (popup) {
                    popup.style.display = 'none';
                    console.log('Popup ocultado');
                } else {
                    console.log('Elemento do popup não encontrado');
                }
                
                alert('Aplicativo ativado com sucesso! A página será recarregada.');
                location.reload();
            } else {
                console.log('Falha na ativação do aplicativo');
                alert('Ocorreu um erro ao ativar o aplicativo. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro durante a ativação:', error);
            alert('Ocorreu um erro ao ativar o aplicativo. Por favor, tente novamente.');
        }
    } else {
        console.log('Código incorreto');
        alert('Código incorreto. Tente novamente.');
    }
});
        }

        async function verificarAtivacaoAntes(acao) {
    const status = await verificarStatusAplicativo();
    if (status.status === 'ativado' || status.status === 'em_teste') {
        acao();
    } else {
        mostrarPopupVerificacao();
    }
}
        async function verificarStatusInicial() {
            const status = await verificarStatusAplicativo();
            if (status.status !== 'ativado') {
                mostrarPopupVerificacao();
                // Desabilitar todas as interações com a página
                document.body.style.pointerEvents = 'none';
                // Exceto o popup de verificação
                document.getElementById('popupVerificacao').style.pointerEvents = 'auto';
            }
        }

        async function salvarVerificacaoNoIndexedDB(verificado) {
            const db = await abrirIndexedDB();
            const transaction = db.transaction(['verificacao'], 'readwrite');
            const objectStore = transaction.objectStore('verificacao');
            return objectStore.put({ id: 'status', verificado });
        }

        async function obterStatusVerificacao() {
            const db = await abrirIndexedDB();
            const transaction = db.transaction(['verificacao'], 'readonly');
            const objectStore = transaction.objectStore('verificacao');
            const request = objectStore.get('status');

            return new Promise((resolve, reject) => {
                request.onsuccess = event => {
                    resolve(event.target.result ? event.target.result.verificado : false);
                };
                request.onerror = event => {
                    reject(event);
                };
            });
        }

        // Função para gerar PDF
        async function generatePDF_v3_0() {
    try {
        // 1. Validação do Cliente
        const clienteId = clienteSelect.value;
        if (!clienteId) {
            alert('Selecione um cliente.');
            return;
        }

        const cliente = clientes.find(c => c.id == clienteId);
        if (!cliente) {
            alert('Informações do cliente não encontradas.');
            return;
        }

        // 2. Configuração do jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 15;

        // 3. Obter Informações do Usuário e Formas de Pagamento
        const infoUsuario = await obterInformacoesUsuarioDoIndexedDB();
        const formasPagamento = infoUsuario.payment_methods || []; // Recupera as formas de pagamento

        const colors = {
            primary: hexToRgb(infoUsuario.cores?.primaria || '#0056b3'),
            secondary: hexToRgb(infoUsuario.cores?.secundaria || '#17a2b8'),
            text: [33, 37, 41],
            lightGray: [248, 249, 250],
            white: [255, 255, 255]
        };

        // Função para converter hex para RGB
        function hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
        }

        // Função para adicionar texto de forma segura
        function safeText(text, x, y, options = {}) {
            if (typeof text !== 'string') text = String(text || '');
            if (typeof x !== 'number' || typeof y !== 'number') {
                console.error('Coordenadas inválidas:', x, y);
                return;
            }
            try {
                doc.text(text, x, y, options);
            } catch (error) {
                console.error('Erro ao adicionar texto:', error, 'Texto:', text, 'Coordenadas:', x, y);
            }
        }

        // Função para adicionar a logo da empresa
        async function addLogo(x, y, maxWidth, maxHeight) {
            if (infoUsuario.logo) {
                try {
                    const img = new Image();
                    img.src = infoUsuario.logo;
                    await new Promise((resolve, reject) => {
                        img.onload = resolve;
                        img.onerror = reject;
                    });
                    let imgWidth = img.width;
                    let imgHeight = img.height;
                    const imgRatio = imgWidth / imgHeight;
                    const boxRatio = maxWidth / maxHeight;
                    if (imgRatio > boxRatio) {
                        imgWidth = maxWidth;
                        imgHeight = maxWidth / imgRatio;
                    } else {
                        imgHeight = maxHeight;
                        imgWidth = maxHeight * imgRatio;
                    }
                    const offsetX = x + (maxWidth - imgWidth) / 2;
                    const offsetY = y + (maxHeight - imgHeight) / 2;
                    doc.addImage(infoUsuario.logo, 'PNG', offsetX, offsetY, imgWidth, imgHeight);
                } catch (error) {
                    console.error("Erro ao adicionar a logo:", error);
                    doc.setFontSize(12);
                    safeText("LOGO", x + maxWidth / 2, y + maxHeight / 2, { align: 'center', baseline: 'middle' });
                }
            } else {
                doc.setFontSize(12);
                safeText("LOGO", x + maxWidth / 2, y + maxHeight / 2, { align: 'center', baseline: 'middle' });
            }
        }

        // Função para adicionar o rodapé
        function addFooter(pageNumber) {
            doc.setFillColor(...colors.primary);
            doc.rect(0, pageHeight - 10, pageWidth, 10, 'F');
            doc.setTextColor(...colors.white);
            doc.setFontSize(8);
            safeText(infoUsuario.empresa || '', margin, pageHeight - 3);
            safeText(infoUsuario.telefone || '', pageWidth / 2, pageHeight - 3, { align: 'center' });
            safeText(`Página ${pageNumber}`, pageWidth - margin, pageHeight - 3, { align: 'right' });
        }

        // Função para adicionar uma nova página com rodapé
        function addPage(pageNumber) {
            doc.addPage();
            addFooter(pageNumber);
            return margin + 10;
        }

        // Função para adicionar títulos de seção
        function addSectionTitle(title, y) {
            doc.setDrawColor(...colors.primary);
            doc.setLineWidth(0.5);
            doc.line(margin, y, pageWidth - margin, y);
            doc.setTextColor(...colors.primary);
            doc.setFont("helvetica", 'bold');
            doc.setFontSize(14);
            safeText(title, margin, y + 10);
            return y + 20;
        }

        // Função para adicionar a capa do PDF
        async function addCover() {
            doc.setFillColor(...colors.white);
            doc.rect(0, 0, pageWidth, pageHeight, 'F');
            doc.setFillColor(...colors.primary);
            doc.rect(0, 0, 60, pageHeight, 'F');
            await addLogo(10, 20, 40, 40);
            doc.setTextColor(...colors.primary);
            doc.setFont("helvetica", 'bold');
            doc.setFontSize(24);
            safeText("PROPOSTA DE", 70, 40);
            safeText("ORÇAMENTO", 70, 55);
            doc.setTextColor(...colors.secondary);
            doc.setFont("helvetica", 'italic');
            doc.setFontSize(14);
            safeText("Soluções em Películas de Alta Qualidade", 70, 70);
            doc.setTextColor(...colors.text);
            doc.setFont("helvetica", 'normal');
            doc.setFontSize(10);
            safeText(`Data: ${new Date().toLocaleDateString('pt-BR')}`, pageWidth - margin, 40, { align: 'right' });
            safeText(`Orçamento Nº: ${Math.floor(Math.random() * 10000)}`, pageWidth - margin, 48, { align: 'right' });
            doc.setFillColor(...colors.lightGray);
            doc.roundedRect(70, 90, pageWidth - 85, 60, 3, 3, 'F');

            // Seção Contratada
            doc.setTextColor(...colors.primary);
            doc.setFont("helvetica", 'bold');
            doc.setFontSize(12);
            safeText("CONTRATADA", 75, 102);
            doc.setTextColor(...colors.text);
            doc.setFont("helvetica", 'normal');
            doc.setFontSize(10);
            safeText(`Empresa: ${infoUsuario.empresa || ''}`, 75, 115);
            safeText(`Telefone: ${infoUsuario.telefone || ''}`, 75, 125);
            safeText(`Email: ${infoUsuario.email || ''}`, 75, 135);
            safeText(`CNPJ/CPF: ${infoUsuario.cpfCnpj || ''}`, 75, 145);
            safeText(`Endereço: ${infoUsuario.endereco || ''}`, 75, 155); // Adicionado

            // Seção Cliente
            doc.setFillColor(...colors.lightGray);
            doc.roundedRect(70, 160, pageWidth - 85, 60, 3, 3, 'F');
            doc.setTextColor(...colors.primary);
            doc.setFont("helvetica", 'bold');
            doc.setFontSize(12);
            safeText("CLIENTE", 75, 172);
            doc.setTextColor(...colors.text);
            doc.setFont("helvetica", 'normal');
            doc.setFontSize(10);
            safeText(`Nome: ${cliente.nome || ''}`, 75, 185);
            safeText(`Telefone: ${cliente.telefone || ''}`, 75, 195);
            safeText(`Email: ${cliente.email || 'N/A'}`, 75, 205);
            safeText(`CNPJ/CPF: ${cliente.cpfCnpj || cliente.cpf || cliente.cnpj || 'N/A'}`, 75, 215);
            safeText(`Endereço: ${cliente.endereco || ''}`, 75, 225); // Adicionado

            addFooter(1);
        }

        // Funções auxiliares para cálculos
        function calculateParceladoSemJuros(total, parcelas_max) {
            return (total / parcelas_max).toFixed(2);
        }

        function calculateParceladoComJuros(total, parcelas_max, juros) {
            // Fórmula de juros compostos: FV = PV * (1 + i)^n
            const fator = Math.pow(1 + juros / 100, parcelas_max);
            const totalComJuros = total * fator;
            const valorParcela = (totalComJuros / parcelas_max).toFixed(2);
            return valorParcela;
        }

        function calculateAdiantamento(total, porcentagem) {
            return ((total * porcentagem) / 100).toFixed(2);
        }






 // Função principal para adicionar o conteúdo ao PDF
function addContent() {
    let y = addPage(2);
    let pageNumber = 2;

    // Seção Orçamento Detalhado
    y = addSectionTitle("Orçamento Detalhado", y);
    y += 10;

    const medidaGroups = document.querySelectorAll('#medidasContainer > div');

    const medidasPorPelicula = {};
    const totaisGerais = { totalM2: 0, precoTotal: 0 };

    // Agrupar medidas por película
    medidaGroups.forEach(group => {
        const isChecked = group.querySelector('input[type="checkbox"]')?.checked;
        const largura = parseFloat(group.querySelector('.largura-input')?.value) || 0;
        const altura = parseFloat(group.querySelector('.altura-input')?.value) || 0;
        const quantidade = parseInt(group.querySelector('.quantidade-input')?.value) || 0;

        if (isChecked && largura > 0 && altura > 0 && quantidade > 0) {
            const peliculaNome = group.querySelector('.pelicula-select')?.value;
            if (peliculaNome) {
                if (!medidasPorPelicula[peliculaNome]) {
                    medidasPorPelicula[peliculaNome] = [];
                }
                medidasPorPelicula[peliculaNome].push(group);

                const pelicula = peliculas.find(p => p.nome === peliculaNome);
                const area = largura * altura * quantidade / 10000; // Convertendo para m²
                const preco = pelicula ? area * pelicula.preco : 0;

                totaisGerais.totalM2 += area;
                totaisGerais.precoTotal += preco;
            }
        }
    });
        
        
    function addMedidasTable(medidas, peliculaNome) {
        // [Código da função já modificado acima]
    }










// Função para adicionar garantias por película
function addGarantiasSection() {
    y = addSectionTitle("Garantias", y);
    y += 10;

    Object.keys(medidasPorPelicula).forEach(peliculaNome => {
        const pelicula = peliculas.find(p => p.nome === peliculaNome);
        if (pelicula) {
            if (y > pageHeight - 60) {
                y = addPage(++pageNumber);
                y = addSectionTitle("Garantias (Continuação)", y);
                y += 10;
            }

            doc.setTextColor(...colors.primary);
            doc.setFont("helvetica", 'bold');
            doc.setFontSize(12);
            safeText(peliculaNome, margin, y);
            y += 7;

            doc.setTextColor(...colors.text);
            doc.setFont("helvetica", 'normal');
            doc.setFontSize(10);
            safeText(`Garantia Fabricante: ${pelicula.garantiaFabricante} anos`, margin + 5, y);
            y += 7;
            safeText(`Garantia Mão de Obra: ${pelicula.garantiaMaoDeObra} dias`, margin + 5, y);
            y += 10;
        }
    });
}










// Função para adicionar uma tabela de medidas por película
function addMedidasTable(medidas, peliculaNome) {
    const headers = ["Item", "Dimensões", "Ambiente", "Tipo", "Área", "Preço"];
    const colWidths = [15, 30, 40, 40, 20, 30];
    
    doc.setTextColor(...colors.primary);
    doc.setFont("helvetica", 'bold');
    doc.setFontSize(12);
    safeText(peliculaNome, margin, y);
    y += 10;

    // Cabeçalho da tabela
    doc.setFillColor(...colors.primary);
    doc.rect(margin, y, pageWidth - 2*margin, 10, 'F');
    doc.setTextColor(...colors.white);
    doc.setFont("helvetica", 'bold');
    doc.setFontSize(10);

    let xOffset = margin;
    headers.forEach((header, index) => {
        safeText(header, xOffset + 2, y + 7);
        xOffset += colWidths[index];
    });
    y += 12;

    doc.setFont("helvetica", 'normal');
    doc.setFontSize(9);

    const zebraColor1 = [255, 255, 255];
    const zebraColor2 = [245, 245, 245];

    medidas.forEach((group, index) => {
        if (y > pageHeight - 60) {
            y = addPage(++pageNumber);
            // Repetir o cabeçalho da tabela na nova página
            doc.setFillColor(...colors.primary);
            doc.rect(margin, y, pageWidth - 2*margin, 10, 'F');
            doc.setTextColor(...colors.white);
            doc.setFont("helvetica", 'bold');
            doc.setFontSize(10);
            headers.forEach((header, index) => {
                safeText(header, margin + 2 + colWidths.slice(0, index).reduce((a, b) => a + b, 0), y + 7);
            });
            y += 12;
            doc.setFont("helvetica", 'normal');
            doc.setFontSize(9);
        }

        doc.setFillColor(...(index % 2 === 0 ? zebraColor1 : zebraColor2));
        doc.rect(margin, y - 2, pageWidth - 2*margin, 10, 'F');

        doc.setTextColor(...colors.text);

        const largura = group.querySelector('.largura-input')?.value || '0';
        const altura = group.querySelector('.altura-input')?.value || '0';
        const quantidade = group.querySelector('.quantidade-input')?.value || '0';
        const totalM2 = group.querySelector('input[placeholder="M²"]')?.value || '0';
        const ambiente = group.querySelector('.additional-fields input[placeholder="Selecione ou digite o ambiente"]')?.value || '';
        const tipoAplicacao = group.querySelector('.additional-fields input[placeholder="Selecione ou digite o tipo de aplicação"]')?.value || '';
        const pelicula = peliculas.find(p => p.nome === peliculaNome);

        xOffset = margin;
        safeText(`${index + 1}`, xOffset + 2, y + 3);
        xOffset += colWidths[0];
        safeText(`${largura}x${altura} (${quantidade})`, xOffset + 2, y + 3);
        xOffset += colWidths[1];
        safeText(ambiente, xOffset + 2, y + 3);
        xOffset += colWidths[2];
        safeText(tipoAplicacao, xOffset + 2, y + 3);
        xOffset += colWidths[3];
        safeText(`${totalM2} m²`, xOffset + 2, y + 3);
        xOffset += colWidths[4];
        
        if (pelicula) {
            const preco = (pelicula.preco * parseFloat(totalM2)).toFixed(2);
            safeText(`R$ ${preco}`, xOffset + 2, y + 3);
        }
        xOffset += colWidths[5];

        y += 10;
    });

    return y;
}


        // Adicionar tabelas de medidas por película
    Object.entries(medidasPorPelicula).forEach(([peliculaNome, medidas], index) => {
        if (index > 0) y = addPage(++pageNumber);
        y = addMedidasTable(medidas, peliculaNome);
        
        const totalPelicula = {
            totalM2: medidas.reduce((sum, group) => sum + (parseFloat(group.querySelector('input[placeholder="M²"]')?.value) || 0), 0),
            precoTotal: medidas.reduce((sum, group) => {
                const area = parseFloat(group.querySelector('input[placeholder="M²"]')?.value) || 0;
                const pelicula = peliculas.find(p => p.nome === peliculaNome);
                return sum + (pelicula ? area * pelicula.preco : 0);
            }, 0)
        };

            // Acumular nos totais gerais
        totaisGerais.totalM2 += totalPelicula.totalM2;
        totaisGerais.precoTotal += totalPelicula.precoTotal;

        console.log("Subtotal:", peliculaNome, "Área:", totalPelicula.totalM2, "Preço:", totalPelicula.precoTotal);
        console.log("Total Geral Atualizado:", totaisGerais.totalM2, totaisGerais.precoTotal);

        y += 5;
        doc.setDrawColor(...colors.secondary);
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageWidth - margin, y);
        doc.setTextColor(...colors.secondary);
        doc.setFont("helvetica", 'bold');
        doc.setFontSize(10);
        safeText(`Subtotal ${peliculaNome}:`, margin, y + 10);
        safeText(`Área: ${totalPelicula.totalM2.toFixed(2)} m²`, pageWidth / 2, y + 10);
        safeText(`R$ ${totalPelicula.precoTotal.toFixed(2)}`, pageWidth - margin, y + 10, { align: 'right' });
        y += 15;
    });

    console.log("Final Total Geral:", totaisGerais.totalM2, totaisGerais.precoTotal);

    if (y > pageHeight - 60) {
        y = addPage(++pageNumber);
    }

            // Seção de Total Geral
    y = addSectionTitle("Total Geral do Orçamento", y);
    y += 10;
    doc.setDrawColor(...colors.primary);
    doc.setLineWidth(1);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;
    doc.setTextColor(...colors.primary);
    doc.setFont("helvetica", 'bold');
    doc.setFontSize(12);
    safeText("Total Geral:", margin, y + 10);
    safeText(`Área Total: ${totaisGerais.totalM2.toFixed(2)} m²`, margin, y + 20);
    safeText(`Preço Total: R$ ${totaisGerais.precoTotal.toFixed(2)}`, pageWidth - margin, y + 20, { align: 'right' });

    y += 30;

    // Adicionar a seção de garantias
    addGarantiasSection();

          // Seção de Condições de Pagamento e Informações Relevantes
    y = addPage(++pageNumber);
    y = addSectionTitle("Condições de Pagamento e Informações Relevantes", y);
    y += 10;

    doc.setTextColor(...colors.text);
    doc.setFont("helvetica", 'normal');
    doc.setFontSize(10);

    // Construindo as Condições de Pagamento com Formas de Pagamento Dinâmicas
    const condicoesPagamento = [
        "1. Formas de Pagamento Aceitas:"
    ];

         // Adicionando as formas de pagamento dinâmicas com valores
    formasPagamento.forEach(method => {
        let metodoTexto = '';
        switch (method.tipo) {
            case 'pix':
                metodoTexto = `• Pix R$ ${totaisGerais.precoTotal.toFixed(2)}`;
                break;
            case 'boleto':
                metodoTexto = `• Boleto Bancário R$ ${totaisGerais.precoTotal.toFixed(2)}`;
                break;
            case 'parcelado_sem_juros':
                const parcelaSemJuros = calculateParceladoSemJuros(totaisGerais.precoTotal, method.parcelas_max);
                metodoTexto = `• Parcelado sem Juros (até ${method.parcelas_max}x)`;
                break;
            case 'parcelado_com_juros':
                const parcelaComJuros = calculateParceladoComJuros(totaisGerais.precoTotal, method.parcelas_max, method.juros);
                metodoTexto = `• Parcelado com Juros (até ${method.parcelas_max}x, Taxa de ${method.juros}%)`;
                break;
            case 'adiantamento':
                const adiantamento = calculateAdiantamento(totaisGerais.precoTotal, method.porcentagem);
                metodoTexto = `• Adiantamento: ${method.porcentagem}% do valor total R$ ${adiantamento}`;
                break;
            case 'observacao':
                metodoTexto = `• Observações Pag: ${method.texto}`;
                break;
            default:
                metodoTexto = `• ${method.tipo}`;
        }
        if (method.ativo) {
            condicoesPagamento.push(metodoTexto);

            // Detalhes adicionais para alguns tipos
            if (method.tipo === 'parcelado_sem_juros') {
                condicoesPagamento.push(`   Número de Parcelas: ${method.parcelas_max}x R$ ${calculateParceladoSemJuros(totaisGerais.precoTotal, method.parcelas_max)}`);
            }
            if (method.tipo === 'parcelado_com_juros') {
                condicoesPagamento.push(`   Número de Parcelas: ${method.parcelas_max}x R$ ${calculateParceladoComJuros(totaisGerais.precoTotal, method.parcelas_max, method.juros)}`);
                condicoesPagamento.push(`   Taxa de Juros: ${method.juros}%`);
            }
            // Não há detalhes adicionais para Adiantamento e Observação
        }
    });

            // Adicionando as condições estáticas
    const condicoesEstaticas = [
        "",
        "2. Cronograma de Pagamento:",
        "   • Aberto a negociação",
        "",
        "3. Prazo de Instalação:",
        "   • A ser definido em comum acordo, conforme disponibilidade",
        "",
        "4. Validade da Proposta:",
        "   • Esta proposta é válida por 60 dias a partir da data de emissão",
        "",
        "5. Data da Aplicação:",
        "   • A combinar",
        "",
        "6. Observações Importantes:",
        "   • Quaisquer alterações no projeto podem resultar em ajustes no orçamento",
        "   • A instalação está sujeita às condições climáticas favoráveis",
        "   • O cliente é responsável por fornecer acesso adequado ao local de instalação"
    ];

            // Combinar as formas de pagamento dinâmicas com as condições estáticas
    const todasCondicoes = condicoesPagamento.concat(condicoesEstaticas);

const lineHeight = 6;
todasCondicoes.forEach((condicao, index) => {
    if (y > pageHeight - 40) {
        y = addPage(++pageNumber);
        y = addSectionTitle("Condições de Pagamento (Continuação)", y);
        y += 10;
    }
    safeText(condicao, margin, y);
    y += lineHeight;
});

y += 20;
    doc.setDrawColor(...colors.primary);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth / 2 - 20, y);
    doc.setFont("helvetica", 'bold');
    doc.setFontSize(11);
    safeText(infoUsuario.nome || '', margin, y + 6);
    doc.setFont("helvetica", 'normal');
    doc.setFontSize(10);
    safeText(infoUsuario.empresa || '', margin, y + 12);
    safeText(infoUsuario.telefone || '', margin, y + 18);
    safeText(infoUsuario.email || '', margin, y + 24);
}

        // Adicionar a capa
        await addCover();
        // Adicionar o conteúdo
        addContent();

        // Salvar o PDF com o nome baseado no nome do cliente
        doc.save(`orcamento_${cliente.nome.replace(/\s+/g, '_').toLowerCase()}.pdf`);
        console.log('PDF gerado com sucesso!');
    } catch (error) {
        console.error("Erro ao gerar PDF:", error);

        if (error.message && error.message.includes("Cannot read properties of undefined")) {
            alert("Erro ao gerar o PDF: Dados da empresa incompletos. Por favor, preencha todas as informações da empresa no menu de configurações do usuário antes de gerar o PDF.");
        } else {
            alert("Ocorreu um erro ao gerar o PDF. Por favor, verifique se todas as informações necessárias foram preenchidas e tente novamente.");
        }
    }
}


async function salvarClienteNoIndexedDB(cliente) {
    const db = await abrirIndexedDB();
    const transaction = db.transaction(['clientes'], 'readwrite');
    const objectStore = transaction.objectStore('clientes');
    const request = objectStore.add(cliente);
    return new Promise((resolve, reject) => {
        request.onsuccess = event => {
            resolve(event.target.result);
        };
        request.onerror = event => {
            reject(event);
        };
    });
}



        async function obterTodosClientesDoIndexedDB() {
            const db = await abrirIndexedDB();
            const transaction = db.transaction(['clientes'], 'readonly');
            const objectStore = transaction.objectStore('clientes');
            const request = objectStore.getAll();

            return new Promise((resolve, reject) => {
                request.onsuccess = event => {
                    resolve(event.target.result);
                };
                request.onerror = event => {
                    reject(event);
                };
            });
        }

        async function removerClienteDoIndexedDB(id) {
            const db = await abrirIndexedDB();
            const transaction = db.transaction(['clientes'], 'readwrite');
            const objectStore = transaction.objectStore('clientes');
            
            return new Promise((resolve, reject) => {
                const request = objectStore.delete(parseInt(id));
                request.onsuccess = () => {
                    console.log(`Cliente com ID ${id} removido do IndexedDB.`);
                    resolve();
                };
                request.onerror = (event) => {
                    console.error(`Erro ao tentar remover o cliente com ID ${id}:`, event);
                    reject(event);
                };
            });
        }

        async function salvarMedidasNoIndexedDB(cliente, medidas) {
            const db = await abrirIndexedDB();
            const transaction = db.transaction(['medidas'], 'readwrite');
            const objectStore = transaction.objectStore('medidas');
            return objectStore.put({ cliente, medidas });
        }

        async function obterMedidasDoIndexedDB(cliente) {
            const db = await abrirIndexedDB();
            const transaction = db.transaction(['medidas'], 'readonly');
            const objectStore = transaction.objectStore('medidas');
            const request = objectStore.get(cliente);

            return new Promise((resolve, reject) => {
                request.onsuccess = event => {
                    resolve(event.target.result ? event.target.result.medidas : null);
                };
                request.onerror = event => {
                    reject(event);
                };
            });
        }

        async function removerMedidasDoIndexedDB(cliente) {
            const db = await abrirIndexedDB();
            const transaction = db.transaction(['medidas'], 'readwrite');
            const objectStore = transaction.objectStore('medidas');
            return objectStore.delete(cliente);
        }
   
        window.addEventListener('load', () => {
    const trialDays = 30; // Definir o período de teste de 30 dias
    const firstVisit = localStorage.getItem('firstVisit');
    
    if (!firstVisit) {
        // Primeira visita
        const firstVisitDate = new Date();
        localStorage.setItem('firstVisit', firstVisitDate);
        alert('Parabéns! Você ganhou 30 dias para explorar tudo o que nosso aplicativo oferece. Use à vontade e, se curtir, quem sabe você não fica por mais tempo? 😉');
    } else {
        // Calcular quantos dias restam
        const currentDate = new Date();
        const firstVisitDate = new Date(firstVisit);
        const timeDiff = currentDate - firstVisitDate;
        const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Converte a diferença em dias
        const daysLeft = trialDays - daysPassed;

        if (daysLeft > 0) {
            // Mostrar alerta de quantos dias restam
            alert(`Você tem ${daysLeft} dias restantes no seu período de teste gratuito.`);
        } else {
            // O período de teste acabou
            alert('Seu período de teste de 30 dias expirou. Esperamos que tenha aproveitado!');
        }
    }
});

    </script>
</body>
</html>
