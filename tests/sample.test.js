import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Cybersecurity Portfolio Task Management", () => {
  it("tracks SOC analyst lab tasks and updates status", async (context) => {
    const testdriver = TestDriver(context);

    // Launch Chrome directly to the web application
    await testdriver.provision.chrome({ url: "https://todomvc.com/examples/react/dist/" });

    // Focus input and add the first lab task
    const input = await testdriver.find("\"What needs to be done?\" input field");
    await input.click();
    await testdriver.type("SOC Analyst Lab 1 - FakeBank Investigation");
    await testdriver.pressKeys(["enter"]);

    // Add the second lab task
    await testdriver.type("SOC Analyst Lab 2 - Login Log Analysis");
    await testdriver.pressKeys(["enter"]);

    // Complete the first lab task
    const firstCheckbox = await testdriver.find("checkbox next to \"SOC Analyst Lab 1 - FakeBank Investigation\"");
    await firstCheckbox.click();

    // Verify task completion
    const completionAssert = await testdriver.assert(
      "\"SOC Analyst Lab 1 - FakeBank Investigation\" is completed and the footer shows \"1 item left!\""
    );
    expect(completionAssert).toBeTruthy();

    // Filter to active tasks
    const activeFilter = await testdriver.find("\"Active\" filter button");
    await activeFilter.click();

    // Verify filter displays only active item
    const filterAssert = await testdriver.assert(
      "only the active todo item \"SOC Analyst Lab 2 - Login Log Analysis\" is shown"
    );
    expect(filterAssert).toBeTruthy();
  });
});
