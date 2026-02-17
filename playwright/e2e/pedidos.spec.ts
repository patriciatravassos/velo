import { test, expect } from '@playwright/test'
import { gerarCodigoPedido } from '../support/helpers'
import { OrderLockupPage } from '../support/pages/OrderLockupPage'


// AAA - Arrange, Act, Assert
test.describe('Consulta do Pedido', () => {

  test.beforeEach(async ({ page }) => {
    // Arrange
  await page.goto('http://localhost:5173/') 
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

})

test('deve consultar pedido aprovado', async ({ page }) => {

    // Test Data
    //const order = 'VLO-NULNMA'

    const order= {
      number: 'VLO-NULNMA',
      status: 'APROVADO' as const,
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Patrícia Travassos',
        email: 'dev@dev.com'
      },
      payment: ' À Vista'
    } 

  
  // Act

  const orderLockupPage = new OrderLockupPage(page)
  await orderLockupPage.searchOrder(order.number)

 //Assert

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

       // Validação do badge de status encapsulada no Page Object
       await orderLockupPage.validateStatusBadge(order.status)

      })




// Pedido reprovado

test('deve consultar pedido reprovado', async ({ page }) => {

  // Test Data
  //const order = 'VLO-AUT43Q'
  const order= {
    number: 'VLO-AUT43Q',
    status: 'REPROVADO' as const,
    color: 'Midnight Black',
    wheels: 'sport Wheels',
    customer: {
      name: 'Steve Jobs',
      email: 'jobs@jobs.com'
    },
    payment: ' À Vista'
  }

// Act

const orderLockupPage = new OrderLockupPage(page)

await orderLockupPage.searchOrder(order.number)

// Assert


  await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
    - img
    - paragraph: Pedido
    - paragraph: ${order.number}
    - status:
      - img
      - text: ${order.status}
    - img "Velô Sprint"
    - paragraph: Modelo
    - paragraph: Velô Sprint
    - paragraph: Cor
    - paragraph: ${order.color}
    - paragraph: Interior
    - paragraph: cream
    - paragraph: Rodas
    - paragraph: ${order.wheels}
    - heading "Dados do Cliente" [level=4]
    - paragraph: Nome
    - paragraph: ${order.customer.name}
    - paragraph: Email
    - paragraph: ${order.customer.email}
    - paragraph: Loja de Retirada
    - paragraph
    - paragraph: Data do Pedido
    - paragraph: /\\d+\\/\\d+\\/\\d+/
    - heading "Pagamento" [level=4]
    - paragraph: ${order.payment}
    - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);

      // Validação do badge de status encapsulada no Page Object
      await orderLockupPage.validateStatusBadge(order.status)

    })


test('deve consultar pedido em analise', async ({ page }) => {

  // Test Data
  //const order = 'VLO-AUT43Q'
  const order= {
    number: 'VLO-U93RG5',
    status: 'EM_ANALISE' as const,
    color: 'Lunar White',
    wheels: 'aero Wheels',
    customer: {
      name: 'João da Silva',
      email: 'joao@velo.com'
    },
    payment: ' À Vista'
  }

// Act

const orderLockupPage = new OrderLockupPage(page)

await orderLockupPage.searchOrder(order.number)

// Assert


  await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
    - img
    - paragraph: Pedido
    - paragraph: ${order.number}
    - status:
      - img
      - text: ${order.status}
    - img "Velô Sprint"
    - paragraph: Modelo
    - paragraph: Velô Sprint
    - paragraph: Cor
    - paragraph: ${order.color}
    - paragraph: Interior
    - paragraph: cream
    - paragraph: Rodas
    - paragraph: ${order.wheels}
    - heading "Dados do Cliente" [level=4]
    - paragraph: Nome
    - paragraph: ${order.customer.name}
    - paragraph: Email
    - paragraph: ${order.customer.email}
    - paragraph: Loja de Retirada
    - paragraph
    - paragraph: Data do Pedido
    - paragraph: /\\d+\\/\\d+\\/\\d+/
    - heading "Pagamento" [level=4]
    - paragraph: ${order.payment}
    - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);

      // Validação do badge de status encapsulada no Page Object
      await orderLockupPage.validateStatusBadge(order.status)

    })


test('deve exibir mensagem quando o pedido não é encontrado', async ({ page}) => {
  const order =  gerarCodigoPedido()
  // Act

  const orderLockupPage = new OrderLockupPage(page)

  await orderLockupPage.searchOrder(order)

  // Assert
  await expect(page.locator('#root')).toMatchAriaSnapshot(`
  - img
  - heading "Pedido não encontrado" [level=3]
  - paragraph: Verifique o número do pedido e tente novamente
  `);


})

})