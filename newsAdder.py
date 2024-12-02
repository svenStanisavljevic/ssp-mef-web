import tkinter as tk
import shutil
import os
import textwrap
from tkinter import filedialog
from datetime import datetime


def submit_form():
    img_dir = "images"
    title = title_entry.get()
    link_checked = link_var.get()
    link_address = link_entry.get() if link_checked else None
    text_content = text_entry.get("1.0", tk.END).strip()
    file_path = file_var.get()

    print("Title:", title)
    print("Link Enabled:", link_checked)
    print("Link Address:", link_address)
    print("Text Content:", text_content)
    print("File Path:", file_path)

    new_file_path = copy_image_to_directory(file_path, img_dir)
    insert_message_to_news(generate_message(title, link_address, text_content, new_file_path, link_checked))


def generate_message(title, link, paragraph_text, img_src, link_enabled):
    current_date = datetime.now().strftime("%d.%m.%Y")

    formatted_paragraph = paragraph_text.replace("\n", "<br>")

    title_tag = f'<a href="{link}" target="_blank">{title}</a>' if link_enabled else title

    generated_message = f"""
    <div class="news-item">
        <img src="{img_src}" alt="{title}">
        <div class="news-item-text">
            <h3>{title_tag}</h3>
            <p>{formatted_paragraph}</p>
        </div>
        <h5>{current_date}</h5>
    </div>
    """

    return textwrap.indent(generated_message, "\t\t\t")

def select_file():
    file_path = filedialog.askopenfilename(initialdir="/home/sven/Downloads")
    file_var.set(file_path)


def toggle_link_entry():
    if link_var.get():
        link_entry.config(state="normal")
    else:
        link_entry.delete(0, tk.END)
        link_entry.config(state="disabled")


def insert_message_to_news(message):
    file_path = "index.html"

    with open(file_path, "r", encoding="utf-8") as file:
        lines = file.readlines()

    target_div = '<div class="news-content">'
    for index, line in enumerate(lines):
        if target_div in line:
            # Dodavanje poruke redak ispod
            lines.insert(index + 1, f"{message}\n")
            break

    with open(file_path, "w", encoding="utf-8") as file:
        file.writelines(lines)

    print(lines)


def copy_image_to_directory(source_path, target_directory):

    if not os.path.isfile(source_path):
        raise FileNotFoundError(f"Source directory '{source_path}' does not exist.")

    os.makedirs(target_directory, exist_ok=True)
    file_name = os.path.basename(source_path)

    target_path = os.path.join(target_directory, file_name)

    shutil.copy2(source_path, target_path)
    print(f"Image successfully copied to: {target_path}")

    relative_path = os.path.join(target_directory, file_name)
    return relative_path


window = tk.Tk()
window.title("Custom Form")
window.geometry("800x800")

# Title
tk.Label(window, text="Title:").pack(pady=5)
title_entry = tk.Entry(window, width=40)
title_entry.pack(pady=5)

# Checkbox for link
link_var = tk.BooleanVar()
link_checkbox = tk.Checkbutton(window, text="Include Link", variable=link_var, command=toggle_link_entry)
link_checkbox.pack(pady=5)

# Link Address (disabled by default)
tk.Label(window, text="Link Address:").pack(pady=5)
link_entry = tk.Entry(window, width=40, state="disabled")
link_entry.pack(pady=5)

# Text input
tk.Label(window, text="Text:").pack(pady=5)
text_entry = tk.Text(window, width=200, height=50)
text_entry.pack(pady=5)

# File Selector
tk.Label(window, text="File Selector:").pack(pady=5)
file_var = tk.StringVar()
file_button = tk.Button(window, text="Choose File", command=select_file)
file_button.pack(pady=5)
file_label = tk.Label(window, textvariable=file_var)
file_label.pack(pady=5)

# Submit Button
submit_button = tk.Button(window, text="Submit", command=submit_form)
submit_button.pack(pady=20)

if __name__ == "__main__":
    window.mainloop()