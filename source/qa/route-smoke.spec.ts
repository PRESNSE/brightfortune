// Copy to app tests after installing @playwright/test. Set BASE_URL for built app.
// This is a provided test contract, not evidence that application tests have run.
import { test, expect } from '@playwright/test';
import routes from '../content/routes.json';
const base = process.env.BASE_URL ?? 'http://localhost:3000';
for (const route of routes) {
  test(`renders ${route.path}`, async ({page}) => {
    const response=await page.goto(base+route.path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page).toHaveTitle(route.title);
    await expect(page.locator('main')).not.toContainText('Lorem ipsum');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',route.description);
  });
}
test('unknown guide is 404',async({page})=>{
 const response=await page.goto(base+'/insights/nonexistent-guide-test');expect(response?.status()).toBe(404);
});
test('preview cannot be indexed',async({page})=>{
 if(process.env.EXPECT_PREVIEW!=='true')test.skip();
 const response=await page.goto(base+'/');
 await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content',/noindex/);
 expect(response?.headers()['x-robots-tag']).toContain('noindex');
});
test('mobile home does not overflow',async({page})=>{
 await page.setViewportSize({width:375,height:812});await page.goto(base+'/');
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);
 expect(overflow).toBe(false);
});
