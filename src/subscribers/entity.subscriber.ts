import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class EntitySubscriber implements EntitySubscriberInterface {
  /**
   * Method database request, who called after entity is loaded.
   * @param {InsertEvent<any>} event - Event
   */
  /*afterLoad(entity: TransactionEntity) {
    console.log(`AFTER ENTITY LOADED: `, entity);
  }*/

  /**
   * Method database request, who called before post insertion.
   * @param {InsertEvent<any>} event - Event
   */
  beforeInsert(event: InsertEvent<any>) {
    if (event.entity) {
      event.entity.createdAt = new Date();
      event.entity.updatedAt = new Date();
    }
  }

  /**
   * Method database request, who called after entity insertion.
   * @param {InsertEvent<any>} event - Event
   */
  /*afterInsert(event: InsertEvent<any>) {
    console.log(`AFTER ENTITY INSERTED: `, event.entity);
  }*/

  /**
   * Method database request, who called before entity update.
   * @param {InsertEvent<any>} event - Event
   */
  beforeUpdate(event: UpdateEvent<any>) {
    if (event.entity) {
      event.entity.updatedAt = new Date();
    }
  }

  /**
   * Method database request, who called after entity update.
   * @param {InsertEvent<any>} event - Event
   */
  /*afterUpdate(event: UpdateEvent<TransactionEntity>) {
    // event.entity.updatedAt = new Date();
    console.log(`AFTER ENTITY UPDATED: `, event.entity);
  }*/

  /**
   * Method database request, who called before entity removal.
   * @param {InsertEvent<any>} event - Event
   */
  /*beforeRemove(event: RemoveEvent<TransactionEntity>) {
    console.log(
      `BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `,
      event.entity,
    );
  }*/

  /**
   * Method database request, who called after entity removal.
   * @param {InsertEvent<any>} event - Event
   */
  /*afterRemove(event: RemoveEvent<TransactionEntity>) {
    console.log(
      `AFTER ENTITY WITH ID ${event.entityId} REMOVED: `,
      event.entity,
    );
  }*/

  /**
   * Method database request, who called before transaction start.
   * @param {InsertEvent<any>} event - Event
   */
  /*beforeTransactionStart(event: TransactionStartEvent) {
    console.log(`BEFORE TRANSACTION STARTED: `, event);
  }*/

  /**
   * Method database request, who called after transaction start.
   * @param {InsertEvent<any>} event - Event
   */
  /*afterTransactionStart(event: TransactionStartEvent) {
    console.log(`AFTER TRANSACTION STARTED: `, event);
  }*/

  /**
   * Method database request, who called before transaction commit.
   * @param {InsertEvent<any>} event - Event
   */
  /*beforeTransactionCommit(event: TransactionCommitEvent) {
    console.log(`BEFORE TRANSACTION COMMITTED: `, event);
  }*/

  /**
   * Method database request, who called after transaction commit.
   * @param {InsertEvent<any>} event - Event
   */
  /*afterTransactionCommit(event: TransactionCommitEvent) {
    console.log(`AFTER TRANSACTION COMMITTED: `, event);
  }*/

  /**
   * Method database request, who called before transaction rollback.
   * @param {InsertEvent<any>} event - Event
   */
  /*beforeTransactionRollback(event: TransactionRollbackEvent) {
    console.log(`BEFORE TRANSACTION ROLLBACK: `, event);
  }*/

  /**
   * Method database request, who called after transaction rollback.
   * @param {InsertEvent<any>} event - Event
   */
  /*afterTransactionRollback(event: TransactionRollbackEvent) {
    console.log(`AFTER TRANSACTION ROLLBACK: `, event);
  }*/
}
