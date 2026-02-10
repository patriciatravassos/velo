import { test, expect } from '@playwright/test'
import { gerarCodigoPedido } from '../support/helpers'

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
      status: 'APROVADO',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Patrícia Travassos',
        email: 'dev@dev.com'
      },
      payment: ' À Vista'
    } 

  
  // Act

  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)
  //await page.getByTestId('search-order-button').click() 
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()

  // Assert
  //await expect(page.getByTestId('order-result-id')).toBeVisible({ timeout: 10000 })
 // await expect(page.getByTestId('order-result-id')).toContainText('VLO-NULNMA')

  //await expect(page.getByTestId('order-result-status')).toBeVisible()
  //await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
  
//const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-NULNMA"]') //xPath

// await expect(orderCode).toBeVisible({timeout: 10_000}) //resolução com codegen
 //await expect(page.getByText('APROVADO')).toBeVisible()

 //Assert
 //const containerPedido = page.getByRole('paragraph')
   // .filter({ hasText: /^Pedido$/ }) // /^xxx$/ expressão regular - significa que o primeiro tem ser x e o íltimo tem que ser x
    //.locator('..') //Sobe para o elemento pai (div que agrupa ambos)

    //await expect(containerPedido).toContainText(order , { timeout: 10_000})
    //await expect(page.getByText('APROVADO')).toBeVisible()

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

      const statusBadge = page.getByRole('status').filter({ hasText: order.status })
      await expect(statusBadge).toHaveClass(/bg-green-100/)
      await expect(statusBadge).toHaveClass(/text-green-700/)

      const statusIcon = statusBadge.locator('svg')
      await expect(statusIcon).toHaveClass(/lucide-circle-check-big/)


})



// Pedido reprovado

test('deve consultar pedido reprovado', async ({ page }) => {

  // Test Data
  //const order = 'VLO-AUT43Q'
  const order= {
    number: 'VLO-AUT43Q',
    status: 'REPROVADO',
    color: 'Midnight Black',
    wheels: 'sport Wheels',
    customer: {
      name: 'Steve Jobs',
      email: 'jobs@jobs.com'
    },
    payment: ' À Vista'
  }

// Act

await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)
//await page.getByTestId('search-order-button').click() 
await page.getByRole('button', { name: 'Buscar Pedido' }).click()

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

    const statusBadge = page.getByRole('status').filter({ hasText: order.status })
    await expect(statusBadge).toHaveClass(/bg-red-100/)
    await expect(statusBadge).toHaveClass(/text-red-700/)

    const statusIcon = statusBadge.locator('svg')
    await expect(statusIcon).toHaveClass(/lucide-circle-x/)

})

test('deve consultar pedido em analise', async ({ page }) => {

  // Test Data
  //const order = 'VLO-AUT43Q'
  const order= {
    number: 'VLO-U93RG5',
    status: 'EM_ANALISE',
    color: 'Lunar White',
    wheels: 'aero Wheels',
    customer: {
      name: 'João da Silva',
      email: 'joao@velo.com'
    },
    payment: ' À Vista'
  }

// Act

await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)
//await page.getByTestId('search-order-button').click() 
await page.getByRole('button', { name: 'Buscar Pedido' }).click()

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

    const statusBadge = page.getByRole('status').filter({ hasText: order.status })
    await expect(statusBadge).toHaveClass(/bg-amber-100/)
    await expect(statusBadge).toHaveClass(/text-amber-700/)

    const statusIcon = statusBadge.locator('svg')
    await expect(statusIcon).toHaveClass(/lucide-clock w-4 h-4/)

})

test('deve exibir mensagem quando o pedido não é encontrado', async ({ page}) => {
  const order =  gerarCodigoPedido()


  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()

  //await expect(page.locator('#root')).toContainText('Pedido não encontrado')
 // await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente')
  await expect(page.locator('#root')).toMatchAriaSnapshot(`
  - img
  - heading "Pedido não encontrado" [level=3]
  - paragraph: Verifique o número do pedido e tente novamente
  `);


})

})