import { test, expect } from '@playwright/test'
// AAA - Arrange, Act, Assert

test('deve consultar pedido aprovado', async ({ page }) => {
    // Arrange
  await page.goto('http://localhost:5173/') 
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  
  // Act

  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-NULNMA')
  //await page.getByTestId('search-order-button').click() 
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  // Assert
  //await expect(page.getByTestId('order-result-id')).toBeVisible({ timeout: 10000 })
 // await expect(page.getByTestId('order-result-id')).toContainText('VLO-NULNMA')

  //await expect(page.getByTestId('order-result-status')).toBeVisible()
  //await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')


 await page.getByText('VLO-NULNMA').click();
 await page.getByText('APROVADO').click();

})