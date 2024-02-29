import assert = require("assert")
import { MockDb, Mailbox } from "../generated/src/TestHelpers.gen";
import {
  EventsSummaryEntity,
  Mailbox_DefaultHookSetEntity,
} from "../generated/src/Types.gen";

import { Addresses } from "../generated/src/bindings/Ethers.bs";

import { GLOBAL_EVENTS_SUMMARY_KEY } from "../src/EventHandlers";


const MOCK_EVENTS_SUMMARY_ENTITY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  mailbox_DefaultHookSetCount: BigInt(0),
  mailbox_DispatchCount: BigInt(0),
  mailbox_DispatchIdCount: BigInt(0),
  mailbox_InitializedCount: BigInt(0),
  mailbox_OwnershipTransferredCount: BigInt(0),
  mailbox_ProcessCount: BigInt(0),
  mailbox_ProcessIdCount: BigInt(0),
  mailbox_RequiredHookSetCount: BigInt(0),
};

describe("Mailbox contract DefaultHookSet event tests", () => {
  // Create mock db
  const mockDbInitial = MockDb.createMockDb();

  // Add mock EventsSummaryEntity to mock db
  const mockDbFinal = mockDbInitial.entities.EventsSummary.set(
    MOCK_EVENTS_SUMMARY_ENTITY
  );

  // Creating mock Mailbox contract DefaultHookSet event
  const mockMailboxDefaultHookSetEvent = Mailbox.DefaultHookSet.createMockEvent({
    hook: Addresses.defaultAddress,
    mockEventData: {
      chainId: 1,
      blockNumber: 0,
      blockTimestamp: 0,
      blockHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
      srcAddress: Addresses.defaultAddress,
      transactionHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
      transactionIndex: 0,
      logIndex: 0,
    },
  });

  // Processing the event
  const mockDbUpdated = Mailbox.DefaultHookSet.processEvent({
    event: mockMailboxDefaultHookSetEvent,
    mockDb: mockDbFinal,
  });

  it("Mailbox_DefaultHookSetEntity is created correctly", () => {
    // Getting the actual entity from the mock database
    let actualMailboxDefaultHookSetEntity = mockDbUpdated.entities.Mailbox_DefaultHookSet.get(
      mockMailboxDefaultHookSetEvent.transactionHash +
        mockMailboxDefaultHookSetEvent.logIndex.toString()
    );

    // Creating the expected entity
    const expectedMailboxDefaultHookSetEntity: Mailbox_DefaultHookSetEntity = {
      id:
        mockMailboxDefaultHookSetEvent.transactionHash +
        mockMailboxDefaultHookSetEvent.logIndex.toString(),
      hook: mockMailboxDefaultHookSetEvent.params.hook,
      eventsSummary: "GlobalEventsSummary",
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualMailboxDefaultHookSetEntity, expectedMailboxDefaultHookSetEntity, "Actual MailboxDefaultHookSetEntity should be the same as the expectedMailboxDefaultHookSetEntity");
  });

  it("EventsSummaryEntity is updated correctly", () => {
    // Getting the actual entity from the mock database
    let actualEventsSummaryEntity = mockDbUpdated.entities.EventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    // Creating the expected entity
    const expectedEventsSummaryEntity: EventsSummaryEntity = {
      ...MOCK_EVENTS_SUMMARY_ENTITY,
      mailbox_DefaultHookSetCount: MOCK_EVENTS_SUMMARY_ENTITY.mailbox_DefaultHookSetCount + BigInt(1),
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualEventsSummaryEntity, expectedEventsSummaryEntity, "Actual MailboxDefaultHookSetEntity should be the same as the expectedMailboxDefaultHookSetEntity");
  });
});
