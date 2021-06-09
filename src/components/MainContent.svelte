<script lang="ts">
    import { nanoid } from "nanoid"
    import type { Player } from "../interfaces"
    import { toPosition } from "../utils"
    import PlayerEditor from "../components/PlayerEditor.svelte"
    import PlayerCard from "../components/PlayerCard.svelte"

    export let players: Array<Player> = []
    let selectedPlayer: Player | undefined
    let isEditing = false

    const deletePlayer = (id: string) => {
        // TODO: add `DELETE` api request (endpoint: `/players`, accepted payload: player id)
        throw new Error("Delete request not implemented")
    }

    const updatePlayer = (player: Player) => {
        // TODO: add `PUT` api request (endpoint: `/players`, accepted payload: player)
        throw new Error("Put request not implemented")
    }

    const addPlayer = (player: Player) => {
        // TODO: add `POST` api request (endpoint: `/players`, accepted payload: player)
        throw new Error("Post request not implemented")
    }

    const getDefaultPlayer = () => {
        return {
            id: nanoid(),
            position: toPosition("Goalkeeper"),
            score: 0,
            goals: 0,
        }
    }
</script>

<!-- <div>
    <ul>
        {#each players as player (player.id)}
            <li>
                <img
                    src={player.picture}
                    alt={`of ${player.name}`}
                    title="Image title"
                />
                <p>{player.name}</p>
                <p>{player.position}</p>
                <p>{player.score}</p>
                <p>{player.goals}</p>
                <div>
                    <button on:click={() => deletePlayer(player.id)}>Delete</button>
                    <button on:click={() => selectedPlayer = player}>Edit</button>
                </div>
            </li>
        {/each}
    </ul>
    <button id="add-player" on:click={() => isEditing = !isEditing}>
        <span>Add</span>
    </button>
</div> -->
<div class="box">
    {#each players as player (player.id)}
        <PlayerCard
            picture="{player.picture}"
            name="{player.name}"
            position="{player.position}"
            score="{player.score}"
            goals="{player.goals}"
            id="{player.id}"
        />
    {/each}
</div>

{#if isEditing || !!selectedPlayer}
    <PlayerEditor
        onClose="{() => {
            isEditing = false
            selectedPlayer = undefined
        }}"
        submitPlayer="{(player) => {
            if (selectedPlayer) {
                return updatePlayer(player)
            } else {
                return addPlayer(player)
            }
        }}"
        player="{selectedPlayer || getDefaultPlayer()}"
    />
{/if}

<style lang="scss">
    .box {
        display: grid;
        grid-template-columns: repeat(1, auto);
        grid-template-rows: auto;
        width: auto;
        margin: 3rem auto 3rem auto;
        padding-bottom: 5rem;
        gap: 5rem;
        justify-items: center;
        @media (min-width: 768px) {
          grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
