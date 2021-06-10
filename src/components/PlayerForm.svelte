<script lang="ts">
    import type { Player, Position } from "../interfaces"
    import { toPosition, readFileAsBase64 } from "../utils"

    export let id: string
    export let name: string = ""
    export let position: Position = "Goalkeeper"
    export let picture: string = ""
    export let score: number = 0
    export let goals: number = 0
    export let onUpdate: (player: Player) => void
    export let onClose: () => void
    //export let submitPlayer: (p: Player) => Promise<any>
    let error: string | undefined
    $: data = {
        id,
        name,
        position,
        picture,
        score,
        goals,
    }

    const addPlayer = (player: Player) => {
        // TODO: add `POST` api request (endpoint: `/players`, accepted payload: player)
        let payload = JSON.stringify({
            id: data.id,
            name: data.name,
            position: data.position,
            picture: data.picture,
            score: data.score,
            goals: data.goals,
        })
        console.log("payload", payload)
        fetch("/players", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: payload,
        })
        //throw new Error("Post request not implemented")
    }
</script>

<div class="modal">
    <div class="box">
        <label class="title" for="name">Name</label>
        <input
            class="text_input"
            required
            id="name"
            name="name"
            on:change="{(e) => {
                name = e.target.value
                onUpdate({ ...data, name })
            }}"
            value="{data.name}"
        />
    </div>
    <div class="box">
        <label class="title" for="name">Position</label>
        <select
            class="text_input"
            bind:value="{position}"
            on:change="{(e) => {
                const nextPosition = toPosition(e.target.value)
                if (nextPosition) {
                    position = nextPosition
                    onUpdate({ ...data, position })
                }
            }}"
            name="position"
            id="position"
        >
            <option value="Goalkeeper">Goalkeeper</option>
            <option value="Defender">Defender</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Forward">Forward</option>
        </select>
    </div>
    <div class="box">
        <label class="title" for="score">Score</label>
        <input
            class="text_input"
            type="number"
            min="0"
            max="100"
            required
            id="score"
            name="score"
            on:change="{(e) => {
                const nextScore = parseInt(e.target.value, 10)
                if (!isNaN(nextScore)) {
                    score = nextScore
                    onUpdate({ ...data, score })
                }
            }}"
            value="{data.score || 0}"
        />
    </div>
    <div class="box">
        <label class="title" for="goals">Goals</label>
        <input
            class="text_input"
            type="number"
            min="0"
            max="100"
            required
            id="goals"
            name="goals"
            on:change="{(e) => {
                const nextGoals = parseInt(e.target.value, 10)
                if (!isNaN(nextGoals)) {
                    goals = nextGoals
                    onUpdate({ ...data, goals })
                }
            }}"
            value="{data.goals || 0}"
        />
    </div>
    <div class="file_input box">
        {#if data.picture}
            <label class="title">Change picture (best 400x400)</label>
            <img src="{data.picture}" alt="Player's preview" />
        {:else}
            <label class="title">Pick a picture (best 400x400)</label>
        {/if}
        {#if error}
            <p class="error">{error}</p>
        {/if}
        <input
            class="img_input"
            type="file"
            accept="image/png, image/jpeg"
            on:change="{(e) => {
                const file = e.currentTarget.files
                    ? e.currentTarget.files[0]
                    : null
                if (file) {
                    readFileAsBase64(file).then((base64) => {
                        if (base64.length > 1048487) {
                            error = 'Image too large'
                        } else {
                            picture = base64
                            onUpdate({ ...data, picture })
                        }
                    })
                }
            }}"
        />
    </div>
    <div class="box">
        <button
            on:click="{() => {
                addPlayer(data)
                onClose()
                //throw new Error('Missing implementation for Add player')
            }}"
        >
            Submit
        </button>

        <button
            on:click="{(e) => {
                e.preventDefault()
                onClose()
            }}"
        >
            Close
        </button>
    </div>
</div>

<style lang="scss">
    .modal {
        position: absolute;
        left: 50%;
        top: 50%;
        width: calc(100vw - 4rem);
        max-width: 32rem;
        max-height: calc(100vh - 4rem);
        overflow: auto;
        transform: translate(-50%, -50%);
        padding: 1rem;
        border-radius: 0.5rem;
        background: white;
    }
    .box {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 2.5rem 2rem;
    }
    button {
        width: 6.2rem;
        height: 2.2rem;
        border-radius: 0.7rem;
        background-color: #374151;
        color: #bfdbfe;
    }
    .text_input {
        padding: 0.5rem;
        border-radius: 0.2rem;
    }
    .title {
        font-size: 16px;
        color: #374151;
    }
    .img_input {
        background-color: black;
    }
</style>
