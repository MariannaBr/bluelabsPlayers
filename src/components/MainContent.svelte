<script lang="ts">
    import { nanoid } from "nanoid"
    import type { Player } from "../interfaces"
    import { toPosition } from "../utils"
    import PlayerForm from "../components/PlayerForm.svelte"
    import PlayerCard from "../components/PlayerCard.svelte"

    export let players: Array<Player> = []
    let addedPlayer: Player | undefined
    let isAdding = false

</script>

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
    <button on:click="{() => (isAdding = true)}"> Add Player </button>
    {#if isAdding}
        <PlayerForm
            onClose="{() => {
                isAdding = false
            }}"
            name=""
            id="{nanoid()}"
            position="{toPosition("Goalkeeper")}"
            picture=""
            score={0}
            goals={0}
            update={false}
            onUpdate="{data => addedPlayer = data}"
        />
    {/if}
</div>

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
    button {
        width: 6.2rem;
        height: 2.2rem;
        border-radius: 0.7rem;
        background-color: #374151;
        color: #bfdbfe;
    }
</style>
