/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory */

/**
 * Vote
 * @param {ch.fhnw.voting.VoteTransaction} VoteTransaction - the VoteTransaction transaction
 * @transaction
 */
async function vote(voteTransaction) {  // eslint-disable-line no-unused-vars

    const me = getCurrentParticipant();

    const registry = await getAssetRegistry('ch.fhnw.voting.PollAsset');
    const parRegistry = await getParticipantRegistry('ch.fhnw.voting.Voter');
    const factory = getFactory();

    //Does the poll exists
    if(await registry.exists(voteTransaction.PollId))
    {
        let pollAsset = await registry.get(voteTransaction.PollId);
        
        //Check for double vote
        if(me.PollsVotedId.includes(pollAsset.PollId)) {
            let violationEvent = await factory.newEvent('ch.fhnw.voting', 'ViolationEvent');
            violationEvent.Date = voteTransaction.Date;
            violationEvent.PollId = voteTransaction.PollId;
            violationEvent.ViolationMessage = "Cannot vote twice for the same poll";
            emit(violationEvent);
            return;
        }


        if(voteTransaction.Type == "YES") {
            pollAsset.poll.Yes++;
        }
        else {
            pollAsset.poll.No++;
        }

        //update the poll and the user
        await registry.update(pollAsset);
        me.PollsVotedId.push(pollAsset.PollId)
        await parRegistry.update(me)
    }
    else {
        let violationEvent = await factory.newEvent('ch.fhnw.voting', 'ViolationEvent');
        violationEvent.Date = voteTransaction.Date;
        violationEvent.PollId = VoteTransaction.PollId;
        violationEvent.ViolationMessage = "Cannot find Vote"
        emit(violationEvent);
    }
}