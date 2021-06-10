<script lang="ts">
    import type { Player, Position } from "../interfaces"
    import Error from "../routes/_error.svelte"
    import { toPosition, readFileAsBase64 } from "../utils"

    export let id: string
    export let name: string
    export let position: Position
    export let picture: string
    export let score: number
    export let goals: number
    export let update: boolean
    export let onUpdate: (player: Player) => void
    export let onClose: () => void

    let error: string | undefined
    let nameError: string | undefined
    let imgError: string | undefined
    $: data = {
        id,
        name,
        position,
        picture,
        score,
        goals,
        update,
    }

    const addPlayer = (player: Player, update: boolean) => {
        let payload = JSON.stringify({
            id: player.id,
            name: player.name,
            position: player.position,
            picture: player.picture,
            score: player.score,
            goals: player.goals,
        })
        let callMethod = "POST"
        if (update) {
            callMethod = "PUT"
        }
        fetch("/players", {
            method: callMethod,
            headers: { "content-type": "application/json" },
            body: payload,
        })
        window.location.reload()
    }
    const InputsValid = (text: string, file: string) => {
        let isValid = true
        if (text.length < 1) {
            nameError = "Please write a valid name!"
            isValid = false
        }
        if (file.length < 1) {
            imgError = "Please upload picture!"
            isValid = false
        } else {
          imgError = ""
        }
        return isValid
    }
    
</script>

<div class="modal">
    <h2 class="center form_title">
        {data.name ? `Edit ${name}` : "New player"}
    </h2>
    <div class="box">
        <label class="title" for="name">Name</label>
        <input
            class="text_input"
            required
            id="name"
            name="name"
            placeholder="{nameError ? nameError : ''}"
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
            class="position"
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
    <div class="file_input box img">
        {#if data.picture}
            <label class="title">Change picture (best 400x400)</label>
            <img src="{data.picture}" alt="Player's preview" />
        {:else}
            <label class="title">Pick a picture (best 400x400)</label>
        {/if}
        {#if imgError}
            <p class="error">{imgError}</p>
        {/if}
        <button class="secondary">
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
                        imgError = ""
                    }
                }}"
            />
            Upload Picture
        </button>
    </div>
    <div class="box">
        <button
            class="primary"
            on:click="{() => {
                if (InputsValid(name, picture)) {
                    addPlayer(data, data.update)
                    onClose()
                }
            }}"
        >
            Submit
        </button>

        <button
            class="primary"
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
  @import '../static/style/base';
    .modal {
        position: fixed;
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
        &.img {
          margin: 0 2rem
        }
    }
    button {
        width: 6.2rem;
        height: 2.2rem;

        &.primary {
            border-radius: 0.7rem;
            background-color: $primary-color;
            color: $secondary-color;
        }
        &.secondary {
            position: relative;
            border-radius: 0.2rem;
            background-color: $secondary-color;
            color: $primary-color;
        }
    }
    .text_input {
        padding: 0.5rem;
        border-radius: 0.2rem;
    }
    .position {
        padding: 0.5rem;
        border-radius: 0.1rem;
        background-color: $secondary-color;
        color: $primary-color;
    }
    .title {
        font-size: 16px;
        color: $primary-color;
    }
    .img_input {
        position: absolute;
        opacity: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
    }
    .form_title {
        background-color: $primary-color;
        border-radius: 0.2rem;
        color: $secondary-color;
        padding: 1rem 0;
    }
    ::placeholder {
        color: red;
    }
</style>
