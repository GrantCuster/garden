#!/bin/bash

# History file to keep track of most recently used commands
HISTORY_FILE="/tmp/menu_history"

# Define your commands here
declare -A COMMANDS=(
    ["deploy"]="npm run deploy"
    ["build"]="npm run build"
    ["new_post"]="bash new_post.sh"
    ["dev"]="python3 -m http.server --directory dist"
    ["edit"]="nvim ."
    ["status"]="git status"
    ["update"]="git pull origin main --rebase"
    ["commit"]="git add . && git commit"
    ["push"]="git push origin main"
    ["exit"]="exit"
    # Add more commands here
)

# Function to display the menu
show_menu() {
    # Sort commands by most recently used and remove duplicates
    if [ -f "$HISTORY_FILE" ]; then
        sorted_commands=$(awk '{print $2}' "$HISTORY_FILE" | tac | awk '!seen[$0]++')
        for cmd in "${!COMMANDS[@]}"; do
            if ! grep -q "^$cmd\$" <<< "$sorted_commands"; then
                sorted_commands="$sorted_commands"$'\n'"$cmd"
            fi
        done
    else
        sorted_commands=$(printf "%s\n" "${!COMMANDS[@]}")
    fi

    # Show the menu using fzf
    selected=$(echo "$sorted_commands" | fzf --height=40% --prompt="Working in the garden: " --reverse)

    echo "$selected"
}

# Function to run the selected command
run_command() {
    local command="$1"
    eval "${COMMANDS[$command]}"
    echo "$(date +%s) $command" >> "$HISTORY_FILE"
}

while true; do
    clear
    selected_command=$(show_menu)
    if [ -n "$selected_command" ]; then
        run_command "$selected_command"
        read -p "Press Enter to return to the menu..."
    else
        break
    fi
done
