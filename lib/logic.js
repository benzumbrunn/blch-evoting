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
    const factory = getFactory();

    if(registry.exists(voteTransaction.PollId))
    {
        let pollAsset = registry.get(voteTransaction.PollId);
        if(voteTransaction.Type == VoteType.YES) {
            pollAsset.Poll.Yes++;
        }
        else {
            pollAsset.Poll.No++;
        }
        registry.update(pollAsset);
    }
    else{
        var violationEvent = factory.newEvent('ch.fhnw.voting', 'ViolationEvent');
        emit(violationEvent);
    }
}