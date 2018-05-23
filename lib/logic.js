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
async function vote(votingTransaction) {  // eslint-disable-line no-unused-vars

    const registry = await getAssetRegistry('ch.fhnw.voting.PollAsset');
    const factory = getFactory();

    if(registry.exists(votingTransaction.PollId))
    {
        let pollAsset = registry.get(votingTransaction.PollId);
        if(votingTransaction.Type == VoteType.Yes) {
            pollAsset.Yes++;
        }
        else {
            pollAsset.No++;
        }
        registry.update(pollAsset);
    }
}