<script lang="ts">
    import type { Player, Position } from "../interfaces"
    import PlayerForm from "../components/PlayerForm.svelte"

    export let id: string
    export let picture: string
    export let name: string
    export let position: Position
    export let score: number
    export let goals: number
  
    let showEdit = false
    let editingPlayer: Player | undefined

    const deletePlayer = (id: string) => {
        let payload = JSON.stringify({id: id})
        fetch("/players", {
            method: "DELETE",
            headers: { "content-type" : "application/json" },
            body: payload,
        })
        window.location.reload()
    }
</script>

<div class="card">
    <div class="img_box">
        <img src="{picture}" alt="{`of ${name}`}" title="Image title" />
    </div>
    <p class="name">{name}</p>
    <div class="center">
        <div class="position_box">
            <p class="position">{position}</p>
        </div>
    </div>
    <div class="data_container">
        <div class="data_box">
            <p class="title">SCORE</p>
            <p class="data">{score}</p>
        </div>
        <div class="data_box">
            <p class="title">GOALS</p>
            <p class="data">{goals}</p>
        </div>
    </div>
    <div class="buttons_box">
        <button class="edit" on:click="{() => (showEdit = true)}"
            ><img class="icon" src="edit.svg" /></button
        >
        <button class="delete" on:click="{() => deletePlayer(id)}"
            ><img class="icon" src="trash.svg" /></button
        >
    </div>
</div>

{#if showEdit}
    <PlayerForm
        onClose="{() => {
            showEdit = false
        }}"
        name="{name}"
        id="{id}"
        position="{position}"
        picture="{picture}"
        score="{score}"
        goals="{goals}"
        update={true}
        onUpdate="{(data) => (editingPlayer = data)}"
    />
{/if}

<style lang="scss">
  @import '../static/style/base';
  //@use 'base';
    .card {
        width: auto;
        max-width: 20rem;
        border-radius: 0.5rem;
        overflow: hidden;
        background-color: #1f2937;
        box-shadow: 0 15px 25px -3px #6b7280;
    }
    .img_box {
        width: 100%;
        height: 15rem;
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
        overflow: hidden;
    }
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    .name {
        color: $secondary-color;
        font-weight: bold;
        margin: 1rem 0 0.5rem 0;
        text-align: center;
        font-size: 20px;
    }
    .position_box {
        width: 6.2rem;
        height: 2.2rem;
        border-radius: 0.7rem;
        background-color: $primary-color;
    }
    .position {
        text-align: center;
        padding: 0.3rem;
        color: #d1d5db;
        margin: 0;
    }
    .data_container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 2.5rem 2rem;
    }
    .data_box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .title {
        color: $secondary-color;
        font-size: 10px;
        margin: 0;
    }
    .data {
        color: $secondary-color;
        font-size: 20px;
        font-weight: bold;
        margin: 0;
    }
    .buttons_box {
        display: flex;
        width: 102%;
        flex-direction: row;
        height: 3rem;
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        overflow: hidden;
        gap: 0.15rem;
    }
    button {
        width: 50%;
        border: hidden;
        background-color: #d1d5db;
        &:hover {
            font-weight: bold;
            background-color: #e5e7eb;
        }
    }
    .icon {
        object-fit: contain;
        height: 40%;
    }
</style>
