import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace ch.fhnw.voting{
   export enum VoteType {
      YES,
      NO,
   }
   export class Voter extends Participant {
      userId: string;
      firstname: string;
      lastname: string;
      PollsVotedId: string[];
   }
   export class Admin extends Voter {
   }
   export class Poll {
      CreatorId: string;
      Name: string;
      Description: string;
      Yes: number;
      No: number;
   }
   export class PollAsset extends Asset {
      PollId: string;
      poll: Poll;
   }
   export class VoteTransaction extends Transaction {
      Date: Date;
      PollId: string;
      Type: VoteType;
   }
   export class ViolationEvent extends Event {
      Date: Date;
      PollId: string;
      ViolationMessage: string;
   }
// }
