/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
    MailboxContract_DefaultHookSet_loader,
    MailboxContract_DefaultHookSet_handler,
    MailboxContract_Dispatch_loader,
    MailboxContract_Dispatch_handler,
    MailboxContract_DispatchId_loader,
    MailboxContract_DispatchId_handler,
    MailboxContract_Initialized_loader,
    MailboxContract_Initialized_handler,
    MailboxContract_OwnershipTransferred_loader,
    MailboxContract_OwnershipTransferred_handler,
    MailboxContract_Process_loader,
    MailboxContract_Process_handler,
    MailboxContract_ProcessId_loader,
    MailboxContract_ProcessId_handler,
    MailboxContract_RequiredHookSet_loader,
    MailboxContract_RequiredHookSet_handler,
} from "../generated/src/Handlers.gen";

import {
    Mailbox_DefaultHookSetEntity,
    Mailbox_DispatchEntity,
    Mailbox_DispatchIdEntity,
    Mailbox_InitializedEntity,
    Mailbox_OwnershipTransferredEntity,
    Mailbox_ProcessEntity,
    Mailbox_ProcessIdEntity,
    Mailbox_RequiredHookSetEntity,
EventsSummaryEntity
} from "../generated/src/Types.gen";

export const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalEventsSummary";

const INITIAL_EVENTS_SUMMARY: EventsSummaryEntity = {
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

    MailboxContract_DefaultHookSet_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MailboxContract_DefaultHookSet_handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    mailbox_DefaultHookSetCount: currentSummaryEntity.mailbox_DefaultHookSetCount + BigInt(1),
  };

  const mailbox_DefaultHookSetEntity: Mailbox_DefaultHookSetEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      hook: event.params.hook      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Mailbox_DefaultHookSet.set(mailbox_DefaultHookSetEntity);
});
    MailboxContract_Dispatch_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MailboxContract_Dispatch_handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    mailbox_DispatchCount: currentSummaryEntity.mailbox_DispatchCount + BigInt(1),
  };

  const mailbox_DispatchEntity: Mailbox_DispatchEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      sender: event.params.sender      ,
      destination: event.params.destination      ,
      recipient: event.params.recipient      ,
      message: event.params.message      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Mailbox_Dispatch.set(mailbox_DispatchEntity);
});
    MailboxContract_DispatchId_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MailboxContract_DispatchId_handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    mailbox_DispatchIdCount: currentSummaryEntity.mailbox_DispatchIdCount + BigInt(1),
  };

  const mailbox_DispatchIdEntity: Mailbox_DispatchIdEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      messageId: event.params.messageId      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Mailbox_DispatchId.set(mailbox_DispatchIdEntity);
});
    MailboxContract_Initialized_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MailboxContract_Initialized_handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    mailbox_InitializedCount: currentSummaryEntity.mailbox_InitializedCount + BigInt(1),
  };

  const mailbox_InitializedEntity: Mailbox_InitializedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      version: event.params.version      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Mailbox_Initialized.set(mailbox_InitializedEntity);
});
    MailboxContract_OwnershipTransferred_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MailboxContract_OwnershipTransferred_handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    mailbox_OwnershipTransferredCount: currentSummaryEntity.mailbox_OwnershipTransferredCount + BigInt(1),
  };

  const mailbox_OwnershipTransferredEntity: Mailbox_OwnershipTransferredEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      previousOwner: event.params.previousOwner      ,
      newOwner: event.params.newOwner      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Mailbox_OwnershipTransferred.set(mailbox_OwnershipTransferredEntity);
});
    MailboxContract_Process_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MailboxContract_Process_handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    mailbox_ProcessCount: currentSummaryEntity.mailbox_ProcessCount + BigInt(1),
  };

  const mailbox_ProcessEntity: Mailbox_ProcessEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      origin: event.params.origin      ,
      sender: event.params.sender      ,
      recipient: event.params.recipient      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Mailbox_Process.set(mailbox_ProcessEntity);
});
    MailboxContract_ProcessId_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MailboxContract_ProcessId_handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    mailbox_ProcessIdCount: currentSummaryEntity.mailbox_ProcessIdCount + BigInt(1),
  };

  const mailbox_ProcessIdEntity: Mailbox_ProcessIdEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      messageId: event.params.messageId      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Mailbox_ProcessId.set(mailbox_ProcessIdEntity);
});
    MailboxContract_RequiredHookSet_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MailboxContract_RequiredHookSet_handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    mailbox_RequiredHookSetCount: currentSummaryEntity.mailbox_RequiredHookSetCount + BigInt(1),
  };

  const mailbox_RequiredHookSetEntity: Mailbox_RequiredHookSetEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      hook: event.params.hook      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Mailbox_RequiredHookSet.set(mailbox_RequiredHookSetEntity);
});
